import { FC } from "react";

import { Id } from "@/convex/_generated/dataModel";
import ChatRender from "./chat-render";
import DocumentRender from "./document-render";

interface DocumentDetailsPageProps {
  params: {
    id: Id<"documents">;
  };
}

const DocumentDetailsPage: FC<DocumentDetailsPageProps> = ({ params }) => {
  return (
    <div className="flex flex-col md:flex-row">
      <DocumentRender documentId={params.id} />
      <ChatRender documentId={params.id} />
    </div>
  );
};

export default DocumentDetailsPage;
