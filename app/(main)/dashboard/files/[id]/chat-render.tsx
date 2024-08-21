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

interface ChatRenderProps {
  documentId: Id<"documents">;
}

const formSchema = z.object({
  chat: z.string().min(1).max(250),
});

const ChatRender: FC<ChatRenderProps> = ({ documentId }) => {
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });
  const askQuestion = useAction(api.documents.askQuestions);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chat: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await askQuestion({ question: values.chat, documentId });
    console.log("Final respo-> ", response);
    form.reset();
  }

  return (
    <div className="flex w-full flex-col p-4 md:w-1/2">
      <Card className="mb-4 flex-grow">
        <CardContent className="p-4">
          <ScrollArea className="h-[calc(100vh-260px)]">
            {chats?.map((chat) => (
              <div
                key={chat._id}
                className={cn(
                  {
                    "bg-secondary text-secondary-foreground": chat.isHuman,
                    "bg-accent text-accent-foreground": !chat.isHuman,
                    "text-right": chat.isHuman,
                  },
                  "my-3 whitespace-pre-line rounded px-3 py-2 text-sm"
                )}
              >
                {chat.isHuman ? (
                  <p className="mr-1 inline rounded-lg bg-background p-1">YOU</p>
                ) : (
                  <p className="mr-1 inline rounded-lg bg-background p-1 px-2">AI</p>
                )}
                : <p className="ml-1 inline">{chat.text}</p>
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
  );
};

export default ChatRender;
