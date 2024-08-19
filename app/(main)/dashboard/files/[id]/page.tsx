"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction, useQuery } from "convex/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingButton from "@/components/common/loadingButton";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface DocumentDetailsPageProps {
  params: {
    id: Id<"documents">;
  };
}

const formSchema = z.object({
  chat: z.string().min(1).max(250),
});

const DocumentDetailsPage: FC<DocumentDetailsPageProps> = ({ params }) => {
  const documentss = useQuery(api.documents.getDocumentById, { documentId: params.id });
  const chats = useQuery(api.chats.getChatsForDocument, { documentId: params.id });
  const askQuestion = useAction(api.documents.askQuestions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chat: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await askQuestion({ question: values.chat, documentId: params.id });
    console.log("Final respo-> ", response);
    form.reset();
  }

  if (!documentss) {
    return <div>You don&apos;t have access to view this document</div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full border-r border-border p-4 md:w-1/2">
        <div>{documentss?.title}</div>
        <p>Document URL - {documentss.documentUrls}</p>
        <ScrollArea className="h-full">TEst TEst</ScrollArea>
      </div>
      <div className="flex w-full flex-col p-4 md:w-1/2">
        <Card className="mb-4 flex-grow">
          <CardContent className="p-4">
            <ScrollArea className="h-[calc(100vh-260px)]">
              {chats?.map((chat) => (
                <div
                  key={chat._id}
                  className={cn(
                    {
                      "bg-slate-200 dark:bg-slate-800": chat.isHuman,
                      "bg-slate-300 dark:bg-slate-950": !chat.isHuman,
                      "text-right": chat.isHuman,
                    },
                    "whitespace-pre-line rounded p-4"
                  )}
                >
                  {chat.isHuman ? "YOU" : "AI"}: {chat.text}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-between gap-2"
          >
            <Controller
              name="chat"
              control={form.control}
              defaultValue={form.formState.defaultValues?.chat}
              render={({ field }) => (
                <Input
                  {...field}
                  className="w-full md:flex-1"
                  placeholder="Ask any questions over this document"
                />
              )}
            />
            {/* TODO display error */}
            <LoadingButton isLoading={form.formState.isSubmitting} loadingText="Submitting...">
              Send
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default DocumentDetailsPage;
