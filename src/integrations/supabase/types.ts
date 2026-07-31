export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string | null
          category: string | null
          content: string | null
          created_at: string
          created_by: string | null
          excerpt: string | null
          featured_image: string | null
          gallery_images: string[]
          id: string
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_read: boolean
          message: string
          phone: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_read?: boolean
          message: string
          phone?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_read?: boolean
          message?: string
          phone?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      downloads: {
        Row: {
          category: string
          cover_image: string | null
          created_at: string
          created_by: string | null
          description: string | null
          download_count: number
          file_path: string | null
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          slug: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          download_count?: number
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          slug?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          download_count?: number
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          slug?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string
          created_by: string | null
          id: string
          question: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          question: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          question?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          related_id: string | null
          related_type: string | null
          status: string
          subject: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          related_id?: string | null
          related_type?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          related_id?: string | null
          related_type?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          created_by: string | null
          file_path: string
          file_size: number | null
          folder: string
          id: string
          mime_type: string | null
          title: string | null
          updated_at: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          created_by?: string | null
          file_path: string
          file_size?: number | null
          folder?: string
          id?: string
          mime_type?: string | null
          title?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          created_by?: string | null
          file_path?: string
          file_size?: number | null
          folder?: string
          id?: string
          mime_type?: string | null
          title?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          featured_image: string | null
          gallery_images: string[]
          id: string
          link_url: string | null
          placement: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          link_url?: string | null
          placement?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          link_url?: string | null
          placement?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          customer_name: string
          email: string | null
          id: string
          is_approved: boolean
          is_flagged: boolean
          moderation_reason: string | null
          rating: number
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          customer_name: string
          email?: string | null
          id?: string
          is_approved?: boolean
          is_flagged?: boolean
          moderation_reason?: string | null
          rating: number
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          customer_name?: string
          email?: string | null
          id?: string
          is_approved?: boolean
          is_flagged?: boolean
          moderation_reason?: string | null
          rating?: number
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          faqs: Json
          featured_image: string | null
          gallery_images: string[]
          icon: string | null
          id: string
          processing_info: string | null
          requirements: string | null
          short_description: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          faqs?: Json
          featured_image?: string | null
          gallery_images?: string[]
          icon?: string | null
          id?: string
          processing_info?: string | null
          requirements?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          faqs?: Json
          featured_image?: string | null
          gallery_images?: string[]
          icon?: string | null
          id?: string
          processing_info?: string | null
          requirements?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      study_abroad_countries: {
        Row: {
          admission_requirements: string | null
          created_at: string
          created_by: string | null
          description: string | null
          featured_image: string | null
          flag_emoji: string | null
          gallery_images: string[]
          id: string
          is_featured: boolean
          scholarships: string | null
          short_description: string | null
          slug: string
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          tuition_info: string | null
          updated_at: string
          visa_requirements: string | null
          why_study_there: string | null
        }
        Insert: {
          admission_requirements?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          featured_image?: string | null
          flag_emoji?: string | null
          gallery_images?: string[]
          id?: string
          is_featured?: boolean
          scholarships?: string | null
          short_description?: string | null
          slug: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          tuition_info?: string | null
          updated_at?: string
          visa_requirements?: string | null
          why_study_there?: string | null
        }
        Update: {
          admission_requirements?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          featured_image?: string | null
          flag_emoji?: string | null
          gallery_images?: string[]
          id?: string
          is_featured?: boolean
          scholarships?: string | null
          short_description?: string | null
          slug?: string
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          tuition_info?: string | null
          updated_at?: string
          visa_requirements?: string | null
          why_study_there?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          created_by: string | null
          email: string | null
          facebook_url: string | null
          featured_image: string | null
          gallery_images: string[]
          id: string
          instagram_url: string | null
          is_featured: boolean
          is_group_photo: boolean
          linkedin_url: string | null
          phone: string | null
          role_title: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          twitter_url: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          facebook_url?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          instagram_url?: string | null
          is_featured?: boolean
          is_group_photo?: boolean
          linkedin_url?: string | null
          phone?: string | null
          role_title?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          twitter_url?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          facebook_url?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          instagram_url?: string | null
          is_featured?: boolean
          is_group_photo?: boolean
          linkedin_url?: string | null
          phone?: string | null
          role_title?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          twitter_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_name: string | null
          content: string | null
          country: string | null
          created_at: string
          created_by: string | null
          featured_image: string | null
          gallery_images: string[]
          id: string
          rating: number | null
          service_used: string | null
          slug: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          client_name?: string | null
          content?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          rating?: number | null
          service_used?: string | null
          slug?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          client_name?: string | null
          content?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          rating?: number | null
          service_used?: string | null
          slug?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          created_at: string
          created_by: string | null
          currency: string
          description: string | null
          destination: string | null
          duration: string | null
          excluded_services: string[]
          featured_image: string | null
          gallery_images: string[]
          id: string
          included_services: string[]
          is_featured: boolean
          itinerary: Json
          price: number | null
          short_description: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          destination?: string | null
          duration?: string | null
          excluded_services?: string[]
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          included_services?: string[]
          is_featured?: boolean
          itinerary?: Json
          price?: number | null
          short_description?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          destination?: string | null
          duration?: string | null
          excluded_services?: string[]
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          included_services?: string[]
          is_featured?: boolean
          itinerary?: Json
          price?: number | null
          short_description?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          city: string | null
          country_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          featured_image: string | null
          gallery_images: string[]
          id: string
          slug: string
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          city?: string | null
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          slug: string
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          city?: string | null
          country_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          featured_image?: string | null
          gallery_images?: string[]
          id?: string
          slug?: string
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "universities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "study_abroad_countries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      website_settings: {
        Row: {
          about_story: string | null
          address: string | null
          business_hours: string | null
          ceo_intro: string | null
          ceo_message: string | null
          ceo_name: string | null
          ceo_photo_url: string | null
          ceo_title: string | null
          ceo_video_url: string | null
          ceo_vision: string | null
          company_name: string
          created_at: string
          email: string | null
          facebook_url: string | null
          google_maps_link: string | null
          hero_headline: string | null
          hero_image_url: string | null
          hero_subheadline: string | null
          hero_video_url: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          logo_url: string | null
          mission: string | null
          payment_note: string | null
          phone: string
          promise: string | null
          stat_countries_covered: string | null
          stat_happy_clients: string | null
          stat_successful_applications: string | null
          stat_years_experience: string | null
          tagline: string | null
          tiktok_url: string | null
          twitter_url: string | null
          updated_at: string
          vision: string | null
          whatsapp: string
          youtube_url: string | null
        }
        Insert: {
          about_story?: string | null
          address?: string | null
          business_hours?: string | null
          ceo_intro?: string | null
          ceo_message?: string | null
          ceo_name?: string | null
          ceo_photo_url?: string | null
          ceo_title?: string | null
          ceo_video_url?: string | null
          ceo_vision?: string | null
          company_name?: string
          created_at?: string
          email?: string | null
          facebook_url?: string | null
          google_maps_link?: string | null
          hero_headline?: string | null
          hero_image_url?: string | null
          hero_subheadline?: string | null
          hero_video_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          mission?: string | null
          payment_note?: string | null
          phone?: string
          promise?: string | null
          stat_countries_covered?: string | null
          stat_happy_clients?: string | null
          stat_successful_applications?: string | null
          stat_years_experience?: string | null
          tagline?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          vision?: string | null
          whatsapp?: string
          youtube_url?: string | null
        }
        Update: {
          about_story?: string | null
          address?: string | null
          business_hours?: string | null
          ceo_intro?: string | null
          ceo_message?: string | null
          ceo_name?: string | null
          ceo_photo_url?: string | null
          ceo_title?: string | null
          ceo_video_url?: string | null
          ceo_vision?: string | null
          company_name?: string
          created_at?: string
          email?: string | null
          facebook_url?: string | null
          google_maps_link?: string | null
          hero_headline?: string | null
          hero_image_url?: string | null
          hero_subheadline?: string | null
          hero_video_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          mission?: string | null
          payment_note?: string | null
          phone?: string
          promise?: string | null
          stat_countries_covered?: string | null
          stat_happy_clients?: string | null
          stat_successful_applications?: string | null
          stat_years_experience?: string | null
          tagline?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          vision?: string | null
          whatsapp?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      why_choose_us: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          sort_order: number
          status: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          sort_order?: number
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_download: { Args: { _id: string }; Returns: undefined }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      content_status: "draft" | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
      content_status: ["draft", "published"],
    },
  },
} as const
