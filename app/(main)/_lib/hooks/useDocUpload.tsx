import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  title: z.string().min(1).max(250),
  file: z.array(z.instanceof(File)),
});

type FormType = z.infer<typeof formSchema>;

export const useSignInForm = () => {
  const router = useRouter();
  const methods = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: [],
    },
    mode: "onChange",
  });

  const createDocument = useMutation(api.documents.createDocuments);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const onSubmit = async (values: FormType) => {
    try {
      const filePromises = values.file.map(async (file) => {
        const postUrl = await generateUploadUrl();

        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!result.ok) {
          toast.error(`Failed to upload file ${file.name}`);
          throw new Error(`Failed to upload file ${file.name}`);
        }

        const { storageId } = await result.json();
        return storageId;
      });

      const storageIds = await Promise.all(filePromises);

      console.log("Selected Form values->", values);
      console.log("Storage IDs->", storageIds);

      const er = await createDocument({ title: values.title, fileIds: storageIds });

      router.push("/dashboard");
    } catch (error) {
      toast.error("Error uploading files");
      console.error("Error uploading files:", error);
    }
  };

  const onHandleSubmit = methods.handleSubmit(onSubmit);

  return {
    methods,
    onHandleSubmit,
    isPending: false,
  };
};
