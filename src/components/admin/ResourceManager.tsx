import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GalleryField, MediaField } from "./MediaField";
import { cms } from "@/lib/db";
import { slugify } from "@/lib/media";
import { supabase } from "@/integrations/supabase/client";

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "switch"
  | "select"
  | "image"
  | "gallery"
  | "tags"
  | "date";

export type Field = {
  name: string;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
  required?: boolean;
  full?: boolean;
};

export type Column = {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (row: any) => React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

export function ResourceManager({
  table,
  title,
  description,
  fields,
  columns,
  slugFrom,
  orderBy = "created_at",
  defaults = {},
}: {
  table: string;
  title: string;
  description: string;
  fields: Field[];
  columns: Column[];
  slugFrom?: string;
  orderBy?: string;
  defaults?: Row;
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});

  const { data, isLoading } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await cms
        .from(table)
        .select("*")
        .order(orderBy, { ascending: false });

      if (error) throw error;

      return (data ?? []) as Row[];
    },
  });

  const emptyForm = useMemo(() => {
    const base: Row = { ...defaults };

    for (const f of fields) {
      if (base[f.name] !== undefined) continue;

      base[f.name] =
        f.type === "gallery" || f.type === "tags"
          ? []
          : f.type === "switch"
            ? false
            : "";
    }

    return base;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  const startCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setOpen(true);
  };

  const startEdit = (row: Row) => {
    setEditing(row);

    const next: Row = { ...emptyForm };

    for (const key of Object.keys(next)) {
      next[key] = row[key] ?? next[key];
    }

    setForm(next);
    setOpen(true);
  };

  const save = useMutation({
    mutationFn: async (values: Row) => {
      const payload: Row = { ...values };

      if (slugFrom && !payload.slug) {
        payload.slug = slugify(String(payload[slugFrom] ?? ""));
      }

      if (payload.slug) {
        payload.slug = slugify(String(payload.slug));
      }

      for (const f of fields) {
        if (f.type === "number") {
          payload[f.name] =
            payload[f.name] === "" ? null : Number(payload[f.name]);
        }
      }

      if (editing) {
        const { error } = await cms
          .from(table)
          .update(payload)
          .eq("id", editing.id);

        if (error) throw error;
      } else {
        const { data: userRes } = await supabase.auth.getUser();

        payload.created_by = userRes.user?.id ?? null;

        const { error } = await cms.from(table).insert(payload);

        if (error) throw error;
      }
    },

    onSuccess: () => {
      toast.success(editing ? "Changes saved" : "Created successfully");
      setOpen(false);

      void qc.invalidateQueries({ queryKey: [table] });
      void qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },

    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await cms.from(table).delete().eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      toast.success("Deleted");

      void qc.invalidateQueries({ queryKey: [table] });
      void qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },

    onError: (e: Error) => toast.error(e.message),
  });

  const set = (name: string, value: unknown) => {
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl text-navy">{title}</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <Button variant="gold" onClick={startCreate}>
          <Plus className="size-4" />
          New
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="whitespace-nowrap px-4 py-3 font-semibold text-navy"
                >
                  {c.label}
                </th>
              ))}

              <th className="px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  <Loader2 className="mx-auto size-5 animate-spin" />
                </td>
              </tr>
            )}

            {!isLoading && (data?.length ?? 0) === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  Nothing here yet. Click “New” to add your first entry.
                </td>
              </tr>
            )}

            {data?.map((row) => (
              <tr key={row.id} className="border-t border-border">
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="px-4 py-3 align-middle"
                  >
                    {c.render
                      ? c.render(row)
                      : String(row[c.key] ?? "—")}
                  </td>
                ))}

                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => startEdit(row)}
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete"
                    onClick={() => {
                      if (
                        confirm(
                          "Delete this entry permanently?",
                        )
                      ) {
                        remove.mutate(row.id);
                      }
                    }}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing
                ? `Edit ${title.replace(/s$/, "")}`
                : `New ${title.replace(/s$/, "")}`}
            </DialogTitle>

            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>

          <form
            id="resource-form"
            className="grid gap-5 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(form);
            }}
          >
            {fields.map((f) => (
              <div
                key={f.name}
                className={
                  f.full ||
                  ["textarea", "richtext", "gallery", "image"].includes(
                    f.type ?? "text",
                  )
                    ? "space-y-2 sm:col-span-2"
                    : "space-y-2"
                }
              >
                <Label htmlFor={f.name}>{f.label}</Label>

                <FieldInput
                  field={f}
                  value={form[f.name]}
                  onChange={(v) => set(f.name, v)}
                />

                {f.help && (
                  <p className="text-xs text-muted-foreground">
                    {f.help}
                  </p>
                )}
              </div>
            ))}
          </form>

          <DialogFooter>
            <Button
              variant="outlineNavy"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="gold"
              type="submit"
              form="resource-form"
              disabled={save.isPending}
            >
              {save.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          id={field.name}
          rows={5}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );

    case "richtext":
      return (
        <div className="space-y-2">
          <Textarea
            id={field.name}
            rows={18}
            value={value ?? ""}
            placeholder={
              field.placeholder ??
              "Write your article here. Leave a blank line between paragraphs."
            }
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            className="min-h-[360px] resize-y leading-7"
          />

          <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
            <p className="text-xs font-semibold text-navy">
              Writing guide
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Keep paragraphs short and easy to read. Use a blank line
              between paragraphs. You can also use simple section headings
              by placing them on their own line.
            </p>
          </div>
        </div>
      );

    case "switch":
      return (
        <Switch
          id={field.name}
          checked={Boolean(value)}
          onCheckedChange={onChange}
        />
      );

    case "select":
      return (
        <Select
          value={value ? String(value) : ""}
          onValueChange={onChange}
        >
          <SelectTrigger id={field.name}>
            <SelectValue placeholder="Select…" />
          </SelectTrigger>

          <SelectContent>
            {field.options?.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "image":
      return (
        <MediaField
          value={value ?? null}
          onChange={onChange}
        />
      );

    case "gallery":
      return (
        <GalleryField
          value={Array.isArray(value) ? value : []}
          onChange={onChange}
        />
      );

    case "tags":
      return (
        <Input
          id={field.name}
          value={
            Array.isArray(value)
              ? value.join(", ")
              : (value ?? "")
          }
          placeholder={
            field.placeholder ?? "Separate with commas"
          }
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      );

    case "number":
      return (
        <Input
          id={field.name}
          type="number"
          step="0.01"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "date":
      return (
        <Input
          id={field.name}
          type="date"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    default:
      return (
        <Input
          id={field.name}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
  }
}

export function StatusBadge({
  status,
}: {
  status: string;
}) {
  return (
    <Badge
      variant={
        status === "published"
          ? "default"
          : "secondary"
      }
      className="capitalize"
    >
      {status}
    </Badge>
  );
}

export const statusField: Field = {
  name: "status",
  label: "Status",
  type: "select",
  options: [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
  ],
};
