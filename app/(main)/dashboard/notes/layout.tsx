"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "convex/react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CreateNoteButton from "./create-note-button";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes);
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();

  return (
    <main className="container mx-auto space-y-8 px-4 py-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <h1 className="text-3xl font-bold md:text-4xl">All Notes</h1>
        <CreateNoteButton />
      </div>

      {!notes && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[20px] w-full" />
            ))}
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      )}

      {notes?.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-8 py-12">
          <Image
            src="/documents.svg"
            width="200"
            height="200"
            alt="a picture of a girl holding documents"
            className="h-32 w-32 md:h-48 md:w-48"
          />
          <h2 className="text-xl font-semibold md:text-2xl">You have no notes</h2>
          <CreateNoteButton />
        </div>
      )}

      {notes && notes.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <ScrollArea className="h-[calc(100vh-80vh)] md:h-[calc(100vh-200px)]">
            <ul className="space-y-2 pr-4">
              {notes?.map((note) => (
                <li
                  key={note._id}
                  className={cn("rounded-md p-3 transition-colors", {
                    "bg-secondary text-secondary-foreground": note._id === noteId,
                    "hover:bg-secondary/50": note._id !== noteId,
                  })}
                >
                  <Link href={`/dashboard/notes/${note._id}`} className="block">
                    {note.text.substring(0, 50) + (note.text.length > 50 ? "..." : "")}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <div className="md:col-span-2">{children}</div>
        </div>
      )}
    </main>
  );
}
