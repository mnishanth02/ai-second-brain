"use client";

import { FC } from "react";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import DocumentCard from "../_lib/components/dashboard/document-card";
import PlaceholderDocument from "../_lib/components/dashboard/placeholder-document";

interface DashboardPageProps {}

const DashboardPage: FC<DashboardPageProps> = ({}) => {
  const documents = useQuery(api.documents.getDocuments);
  const createDocument = useMutation(api.documents.createDocuments);
  return (
    <div className="flex flex-col">
      <h1 className="p-5 text-3xl font-light"> My Documents</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <PlaceholderDocument />
        {documents?.map((doc) => {
          return <DocumentCard document={doc} key={doc._id} />;
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
