"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DeleteNoteButton } from "./delete-note-button";

export default function NotePage() {
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  const note = useQuery(api.notes.getNote, {
    noteId: noteId,
  });

  if (!note) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-6 py-2">
        <CardTitle className="text-2xl font-bold">Note</CardTitle>
        <DeleteNoteButton noteId={note._id} />
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden whitespace-pre-line">{note?.text}</div>
      </CardContent>
    </Card>
  );
}
