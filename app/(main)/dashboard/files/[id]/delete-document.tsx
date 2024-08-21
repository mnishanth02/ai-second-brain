"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/common/loadingButton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function DeleteDocumentButton({ documentId }: { documentId: Id<"documents"> }) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteDocument = useMutation(api.documents.deleteDocument);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogTrigger>
        <Button size={"icon"} variant="destructive">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this document?</AlertDialogTitle>
          <AlertDialogDescription>
            Your document can not be recovered after it&apos;s been deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={() => {
              setIsLoading(true);
              deleteDocument({
                documentId,
              })
                .then(() => {
                  router.push("/dashboard");
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }}
            isLoading={isLoading}
            loadingText="Deleting..."
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
