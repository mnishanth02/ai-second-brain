"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileIcon, NotebookPen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { api } from "@/convex/_generated/api";
import { SearchForm } from "./search-form";

function SearchResult({
  url,
  score,
  type,
  text,
}: {
  type: string;
  url: string;
  score: number;
  text: string;
}) {
  return (
    <Link href={url}>
      <Card className="space-y-4 whitespace-pre-line rounded bg-secondary px-4 text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground">
        <CardHeader className="flex flex-row items-center justify-between gap-2 p-4 text-xl">
          <div className="flex items-center gap-2">
            {type === "note" ? (
              <NotebookPen className="h-5 w-5" />
            ) : (
              <FileIcon className="h-5 w-5" />
            )}
            <CardTitle>{type === "note" ? "Note" : "Document"}</CardTitle>
          </div>
          <Badge variant={"secondary"} className="flex text-sm">
            Relevancy of {score.toFixed(2)}
          </Badge>
        </CardHeader>
        <CardContent className="px-2 pt-0">
          <p className="text-sm">{text.substring(0, 300) + "..."}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function SearchPage() {
  const [results, setResults] = useState<typeof api.search.searchAction._returnType>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (!storedResults) return;
    setResults(JSON.parse(storedResults));
  }, []);

  return (
    <main className="w-full space-y-8 pb-44">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>

      <SearchForm
        setResults={(searchResults) => {
          setResults(searchResults);
          localStorage.setItem("searchResults", JSON.stringify(searchResults));
        }}
      />

      <ul className="flex flex-col gap-4">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <SearchResult
                key={result.record._id}
                type="note"
                url={`/dashboard/notes/${result.record._id}`}
                score={result.score}
                text={result.record.text}
              />
            );
          } else {
            return (
              <SearchResult
                key={result.record._id}
                type="document"
                url={`/dashboard/files/${result.record._id}`}
                score={result.score}
                text={result.record.title + ": " + result.record.description}
              />
            );
          }
        })}
      </ul>
    </main>
  );
}
