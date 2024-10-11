import { z } from "zod";

export const RequestSchema = z.object({
  company: z.string(),
  product: z.string(),
  productDescription: z.string(),
  audience: z.string(),
  emailType: z.enum(["welcome", "promotional", "productUpdate", "newsletter"]),
  length: z.enum(["short", "medium", "long"]).optional(),
});

export type GenerateContentRequest = z.infer<typeof RequestSchema>;

export const ResponseSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type GeneratedContent = z.infer<typeof ResponseSchema>;

export const RequestGrammarSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export type GrammarCheckEmailRequest = z.infer<typeof RequestGrammarSchema>;
