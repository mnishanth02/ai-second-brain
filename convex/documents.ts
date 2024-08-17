import { ConvexError, v } from "convex/values";

import { mutation, query } from "./_generated/server";

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

export const createDocuments = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    console.log("userId", userId);

    if (!userId) {
      throw new ConvexError("User not authenticated");
    }
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      tokenIdentifier: userId,
    });
    return documentId;
  },
});
