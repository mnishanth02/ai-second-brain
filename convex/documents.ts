import "@azure/openai/types";

import { ConvexError, v } from "convex/values";
import { AzureOpenAI } from "openai";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index.mjs";

import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { action, internalQuery, mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

const client = new AzureOpenAI({
  apiKey: process.env.AZRE_OPENAI_API_KEY,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiVersion: "2024-07-01-preview",
});

export async function hasAccessToDocument(
  ctx: MutationCtx | QueryCtx,
  documentId: Id<"documents">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    return null;
  }

  const document = await ctx.db.get(documentId);

  if (!document) {
    return null;
  }

  // if (document.orgId) {
  //   const hasAccess = await hasOrgAccess(ctx, document.orgId);

  //   if (!hasAccess) {
  //     return null;
  //   }
  // } else {
  //   if (document.tokenIdentifier !== userId) {
  //     return null;
  //   }
  // }

  if (document.tokenIdentifier !== userId) {
    return null;
  }

  return { document, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await hasAccessToDocument(ctx, args.documentId);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getDocuments = query({
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});
export const getDocumentById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const accessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!accessObj) {
      return null;
    }

    const docUrls = await Promise.all(
      accessObj.document.fileIds.map(async (id) => {
        return await ctx.storage.getUrl(id);
      })
    );

    return { ...accessObj.document, documentUrls: docUrls };
  },
});

export const createDocuments = mutation({
  args: { title: v.string(), fileIds: v.array(v.id("_storage")) },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log("userId", userId);

    if (!userId) {
      throw new ConvexError("User not authenticated");
    }
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      fileIds: args.fileIds,
      tokenIdentifier: userId,
    });
    return documentId;
  },
});

export const askQuestions = action({
  args: { question: v.string(), documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const accessObj = await ctx.runQuery(internal.documents.hasAccessToDocumentQuery, {
      documentId: args.documentId,
    });

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }

    const filePromise = accessObj.document.fileIds.map(async (id) => {
      return await ctx.storage.get(id);
    });

    const files = await Promise.all(filePromise);

    if (!files || files.length === 0) {
      throw new ConvexError("No files found");
    }

    const text = await files[0]?.text(); // TODO  Retrieving only First file
    console.log("File text ->", text);

    // Add user question to DB
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: accessObj.userId,
    });

    const chatCompletion: ChatCompletionCreateParamsNonStreaming = {
      messages: [
        { role: "system", content: `You are a helpful assistant and here is a text File: ${text}` },
        { role: "user", content: `please answer this question: ${args.question}` },
      ],
      model: process.env.AZURE_OPENAI_MODEL!,
      max_tokens: 200,
    };

    const result = await client.chat.completions.create(chatCompletion);

    const response = result.choices[0].message.content ?? "Could not generate a response";

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: response,
      isHuman: false,
      tokenIdentifier: accessObj.userId,
    });

    return response;
  },
});

export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }
    const fileDeletionPromises = accessObj.document.fileIds.map(async (id) => {
      await ctx.storage.delete(id);
    });

    await Promise.all(fileDeletionPromises);

    await ctx.db.delete(args.documentId);
  },
});
