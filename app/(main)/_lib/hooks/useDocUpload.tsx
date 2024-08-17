import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "@/convex/_generated/api";

const formSchema = z.object({
  title: z.string().min(1).max(250),
  file: z.instanceof(File),
});

type FormType = z.infer<typeof formSchema>;

export const useSignInForm = () => {
  const methods = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
    mode: "onChange",
  });

  const createDocument = useMutation(api.documents.createDocuments);

  const onSubmit = async (values: FormType) => {
    // execute(values);
    console.log("Selected values->", values);
    await createDocument({ title: values.title });
  };

  const onHandleSubmit = methods.handleSubmit(onSubmit);

  return {
    methods,
    onHandleSubmit,
    isPending: false,
  };
};
