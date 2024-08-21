"use client";

import { FC } from "react";
import { useQuery } from "convex/react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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
      <div>{documents?.title}</div>

      <ScrollArea className="h-full">
        <p>Document URL - {documents?.documentUrls}</p>
      </ScrollArea>
    </div>
  );
};

export default DocumentRender;
