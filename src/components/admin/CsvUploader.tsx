import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

const parseCsv = (content: string) => {
  const [header, ...rows] = content.split("\n").filter((row) => row.trim());
  const headers = [
    "title",
    "content",
    "excerpt",
    "image_url",
    "category",
    "author",
    "is_featured",
    "is_editors_pick",
    "is_must_read",
    "published_at",
  ];
  return rows.map((row) => {
    const values = row.split("\t").map((v) => v.trim());
    return headers.reduce(
      (obj, header, i) => {
        obj[header] = values[i];
        return obj;
      },
      {} as Record<string, string>,
    );
  });
};

const parseDate = (dateStr: string) => {
  const [month, day, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day).toISOString();
};

const CsvUploader = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const rows = parseCsv(content);

      for (const row of rows) {
        if (!row.title || !row.category || !row.author) {
          throw new Error("Title, category and author are required fields");
        }

        // First, try to find the category
        let { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("name", row.category)
          .maybeSingle();

        // If category doesn't exist, create it
        if (!categoryData) {
          const { data: newCategory, error: createCategoryError } =
            await supabase
              .from("categories")
              .insert({
                name: row.category,
                icon: "📄", // Default icon
              })
              .select("id")
              .single();

          if (createCategoryError) throw createCategoryError;
          categoryData = newCategory;
        }

        // Then, try to find the author
        let { data: authorData, error: authorError } = await supabase
          .from("authors")
          .select("id")
          .eq("name", row.author)
          .maybeSingle();

        // If author doesn't exist, create them
        if (!authorData) {
          const { data: newAuthor, error: createAuthorError } = await supabase
            .from("authors")
            .insert({
              name: row.author,
              profile_image_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${row.author}`,
            })
            .select("id")
            .single();

          if (createAuthorError) throw createAuthorError;
          authorData = newAuthor;
        }

        // Finally, create the post
        const { error: postError } = await supabase.from("posts").insert({
          title: row.title,
          content: row.content || row.title, // Use title as content if not provided
          excerpt: row.excerpt || row.title.substring(0, 150), // Use truncated title as excerpt if not provided
          image_url: row.image_url,
          category_id: categoryData.id,
          author_id: authorData.id,
          is_featured: row.is_featured?.toLowerCase() === "true",
          is_editors_pick: row.is_editors_pick?.toLowerCase() === "true",
          is_must_read: row.is_must_read?.toLowerCase() === "true",
          published_at: row.published_at
            ? parseDate(row.published_at)
            : new Date().toISOString(),
        });

        if (postError) throw postError;
      }

      setSuccess(true);
      setError(undefined);
      event.target.value = ""; // Reset file input
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload CSV");
      setSuccess(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Upload Posts TSV</h2>

      <Input
        type="file"
        accept=".tsv,.txt,text/tab-separated-values"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4">
          <AlertDescription>File uploaded successfully!</AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-gray-600">
        <p>File Format (Tab-separated):</p>
        <pre className="bg-gray-100 p-2 rounded mt-2 whitespace-pre-wrap overflow-x-auto">
          title content excerpt image_url category author is_featured
          is_editors_pick is_must_read published_at
        </pre>
        <p className="mt-2">Example row:</p>
        <pre className="bg-gray-100 p-2 rounded mt-1 whitespace-pre-wrap overflow-x-auto text-xs">
          Breaking News in Technology: A Major Update This is a dummy article...
          A brief summary... https://example.com/image.jpg Technology Laura
          FALSE TRUE FALSE 2/24/2025
        </pre>
        <p className="mt-2">Notes:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Fields must be separated by tabs</li>
          <li>Title, category, and author are required</li>
          <li>Content will default to title if not provided</li>
          <li>Excerpt will default to truncated title if not provided</li>
          <li>Boolean fields should be TRUE or FALSE (case-insensitive)</li>
          <li>Date format should be MM/DD/YYYY</li>
        </ul>
      </div>
    </div>
  );
};

export default CsvUploader;
