export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          name: string;
          bio: string | null;
          profile_image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          bio?: string | null;
          profile_image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          bio?: string | null;
          profile_image_url?: string | null;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          image_url: string | null;
          category_id: string;
          author_id: string;
          is_featured: boolean;
          is_editors_pick: boolean;
          is_must_read: boolean;
          published_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          image_url?: string | null;
          category_id: string;
          author_id: string;
          is_featured?: boolean;
          is_editors_pick?: boolean;
          is_must_read?: boolean;
          published_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          image_url?: string | null;
          category_id?: string;
          author_id?: string;
          is_featured?: boolean;
          is_editors_pick?: boolean;
          is_must_read?: boolean;
          published_at?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
