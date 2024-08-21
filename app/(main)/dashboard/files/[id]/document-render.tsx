"use client";

import { FC } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { ChevronLeft, MoveLeft, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { DeleteDocumentButton } from "./delete-document";

interface DocumentRenderProps {
  documentId: Id<"documents">;
}

const DocumentRender: FC<DocumentRenderProps> = ({ documentId }) => {
  const documents = useQuery(api.documents.getDocumentById, { documentId });

  if (!documents) {
    return (
      <div className="w-full space-y-6 p-4 md:w-1/2 md:border-r md:border-border">
        <Skeleton className="h-[40px] w-[400px]" />
        <Skeleton className="h-[700px]" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4 md:w-1/2 md:border-r md:border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-4">
          <Link
            href={"/dashboard"}
            className={cn(buttonVariants({ variant: "secondary", size: "icon" }))}
          >
            <ChevronLeft />
          </Link>
          <div>{documents?.title}</div>
        </div>
        <div>
          <DeleteDocumentButton documentId={documentId} />
        </div>
      </div>

      <ScrollArea className="h-full">
        <div className="">{documents?.description}</div>
      </ScrollArea>
    </div>
  );
};

export default DocumentRender;
