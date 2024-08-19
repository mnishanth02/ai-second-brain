"use client";

import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Controller, FormProvider } from "react-hook-form";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUploader from "@/components/common/file-uploader";
import LoadingButton from "@/components/common/loadingButton";

import { useSignInForm } from "../../../_lib/hooks/useDocUpload";

interface DocumentUploadScreenProps {
  // Add any props if needed
}

const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = () => {
  const { methods, onHandleSubmit } = useSignInForm();

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

            <Controller
              name="file"
              control={methods.control}
              defaultValue={methods.formState.defaultValues?.file as File[]}
              render={({ field }) => (
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  maxFileCount={4}
                  maxSize={4 * 1024 * 1024}
                  // progresses={progresses}
                  // pass the onUpload function here for direct upload
                  // onUpload={uploadFiles}
                  disabled={false}
                ></FileUploader>
              )}
            />
          </div>

          <LoadingButton loadingText="Uploading..." isLoading={methods.formState.isSubmitting}>
            Upload Document
          </LoadingButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default DocumentUploadScreen;
