import { FC } from "react";

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
    <Card className="flex min-h-80 max-w-64 flex-col">
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        <CardDescription>Sample Descripltion hardcoded fore tst</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p>Card Content Sample</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant={"secondary"}>View</Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
