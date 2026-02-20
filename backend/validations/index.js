import { z } from "zod";

export const createConfessionSchema = z
  .object({
    content: z
      .string()
      .min(5, "Content is too short")
      .max(5000, "Content exceeds limits"),
    topic: z.enum([
      "Funny",
      "College",
      "Work",
      "Relationships",
      "Spiciest",
      "Deep Thoughts",
    ]),
    secretCode: z
      .string()
      .length(4, "Must be exactly 4 characters")
      .regex(/^\d{4}$/, "Must be a 4-digit number"),
  })
  .strict();

export const updateConfessionSchema = z
  .object({
    content: z.string().min(5).max(5000),
    secretCode: z
      .string()
      .length(4)
      .regex(/^\d{4}$/),
  })
  .strict();

export const voteSchema = z
  .object({
    action: z.enum(["upvote", "downvote"]),
  })
  .strict();

export const createCommentSchema = z
  .object({
    content: z.string().min(1, "Comment cannot be empty").max(1000),
  })
  .strict();

export const spendCoinsSchema = z
  .object({
    action: z.string().min(2),
    amount: z.number().int().positive("Amount must be greater than zero"),
  })
  .strict();

export const createCollectionSchema = z
  .object({
    name: z.string().min(1).max(50),
    description: z.string().max(200).optional(),
  })
  .strict();

export const addBookmarkSchema = z
  .object({
    confessionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
    collectionId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ID"),
    privateNote: z.string().max(500).optional(),
  })
  .strict();
export const onboardingSchema = z
  .object({
    alias: z
      .string()
      .min(3, "Ghost name must be at least 3 characters")
      .max(20, "Ghost name is too long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Alias can only contain letters, numbers, and underscores",
      ),
    avatarSeed: z.string().min(1, "Avatar seed is required"),
    interests: z
      .array(z.string())
      .min(1, "Pick at least one interest")
      .max(5, "You can only follow up to 5 topics"),
  })
  .strict();
