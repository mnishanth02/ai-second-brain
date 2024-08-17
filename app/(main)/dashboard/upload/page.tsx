"use client";

import React, { useCallback, useState } from "react";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Controller, FormProvider } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/common/loadingButton";

import { api } from "@/convex/_generated/api";
import { useSignInForm } from "../../_lib/hooks/useDocUpload";

interface DocumentUploadScreenProps {
  // Add any props if needed
}

const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = () => {
  const { methods, onHandleSubmit } = useSignInForm();

  const [file, setFile] = useState<FileWithPath | null>(null);
  const [error, setError] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-background p-6 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Upload Document</h1>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit}>
          <div className="mb-4">
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={methods.control}
              defaultValue={methods.formState.defaultValues?.title}
              render={({ field }) => <Input {...field} placeholder="Enter document title" />}
            />
          </div>
          <div className="mb-4">
            <Label>Document</Label>
            <div
              {...getRootProps()}
              className={`mt-1 rounded-md border-2 border-dashed p-6 transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-secondary bg-background hover:border-primary/50"
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <p className="text-sm text-foreground/70">{file.name}</p>
              ) : (
                <p className="text-sm text-foreground/70">
                  {isDragActive
                    ? "Drop the file here"
                    : "Drag & drop a file here, or click to select"}
                </p>
              )}
            </div>
          </div>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <LoadingButton loadingText="Uploading..." isLoading={methods.formState.isSubmitting}>
            Upload Document
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default DocumentUploadScreen;
