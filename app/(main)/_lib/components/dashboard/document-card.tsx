import { FC } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Doc } from "@/convex/_generated/dataModel";

interface DocumentCardProps {
  document: Doc<"documents">;
}

const DocumentCard: FC<DocumentCardProps> = ({ document }) => {
  return (
    <Card className="flex min-h-80 min-w-52 max-w-72 flex-col">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription>
          {!document.description ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            document.description
          )}
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant={"secondary"} asChild>
          <Link href={`/dashboard/files/${document._id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
