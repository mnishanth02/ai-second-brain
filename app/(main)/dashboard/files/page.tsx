"use client";

import { FC } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";

import { Card } from "@/components/ui/card"; // Assuming you're using shadcn/ui

import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/convex/_generated/api";
import DocumentCard from "../../_lib/components/dashboard/document-card";
import PlaceholderDocument from "../../_lib/components/dashboard/placeholder-document";

interface FilesProps {}

const FilesPage: FC<FilesProps> = () => {
  const documents = useQuery(api.documents.getDocuments);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-light">My Documents</h1>

      {!documents && <LoadingSkeleton />}
      {documents && (
        <div className="min-h-[50vh] w-full">
          {documents.length > 0 ? <DocumentGrid documents={documents} /> : <EmptyState />}
        </div>
      )}
    </div>
  );
};

const LoadingSkeleton: FC = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {[...Array(8)].map((_, i) => (
      <Card key={i} className="flex h-[200px] flex-col justify-between p-6">
        <Skeleton className="h-[20px] w-full rounded" />
        <Skeleton className="h-[20px] w-3/4 rounded" />
        <Skeleton className="h-[20px] w-1/2 rounded" />
        <Skeleton className="h-[40px] w-[80px] rounded" />
      </Card>
    ))}
  </div>
);

const EmptyState: FC = () => (
  <div className="flex h-[50vh] flex-col items-center justify-center gap-8">
    <PlaceholderDocument />
    <Image
      src="/documents.svg"
      width={200}
      height={200}
      alt="A picture of a person holding documents"
    />
    <h2 className="text-2xl">You have no documents</h2>
  </div>
);

const DocumentGrid: FC<{ documents: any[] }> = ({ documents }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <PlaceholderDocument />
    {documents.map((doc) => (
      <DocumentCard document={doc} key={doc._id} />
    ))}
  </div>
);

export default FilesPage;
