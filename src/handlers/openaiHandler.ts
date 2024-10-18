import express from "express";
import { Request, Response } from "express-serve-static-core";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import {
  GenerateContentRequest,
  RequestSchema,
  ResponseSchema,
  GeneratedContent,
  GrammarCheckEmailRequest,
  RequestGrammarSchema,
} from "../types/openaiTypes.js";

async function aiEmail(
  requestData: GenerateContentRequest,
  res: express.Response
) {
  const { company, productDescription, audience, emailType } = requestData;
  console.log(requestData);
  const systemPrompt = `
  You are a marketing expert, writing emails to sell product. Not more than 300 words
   `;

  const prompt = `
  You are writing a email for a company named ${company}.
  They are selling  ${productDescription}.
  target audience: ${audience}
  type of email: ${emailType}
  `;

  const { partialObjectStream } = await streamObject({
    model: openai("gpt-4o"),
    prompt: prompt,
    system: systemPrompt,
    schema: ResponseSchema,
  });

  // Set headers for streaming
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  let generatedContent: GeneratedContent = { title: "", content: "" };

  // Stream the partial objects
  for await (const partialObject of partialObjectStream) {
    res.write(`data: ${JSON.stringify(partialObject)}\n\n`);
    generatedContent = { ...generatedContent, ...partialObject };
  }

  res.write("data: [DONE]\n\n");

  res.end();
}

export async function grammarCheckEmail(
  requestData: GrammarCheckEmailRequest,
  res: express.Response
) {
  const { title, content } = requestData;

  const systemPrompt = `
  You are a language model trained to check grammar of emails.
   `;

  const prompt = `
  You are grammar and spell checking the following email. Make sure you keep the core meaning of the content and title intact.
  The title is: ${title}
  The content is: ${content}
  
  `;

  const { partialObjectStream } = await streamObject({
    model: openai("gpt-4o"),
    prompt: prompt,
    system: systemPrompt,
    schema: ResponseSchema,
  });

  // Set headers for streaming
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  let generatedContent: GeneratedContent = { title: "", content: "" };

  // Stream the partial objects
  for await (const partialObject of partialObjectStream) {
    res.write(`data: ${JSON.stringify(partialObject)}\n\n`);
    generatedContent = { ...generatedContent, ...partialObject };
  }
  console.log("här är jag");
  console.log("svar från ai:", generatedContent);
  res.write("data: [DONE]\n\n");
  res.end();
}

export const generatedEmail = async (req: Request, res: Response) => {
  try {
    const requestData = RequestSchema.parse(req.body);
    await aiEmail(requestData, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const checkEmail = async (req: Request, res: Response) => {
  try {
    const requestData = RequestGrammarSchema.parse(req.body);
    console.log(requestData);
    await grammarCheckEmail(requestData, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

export const AiEmail = async (req: Request, res: Response) => {
  try {
    const { mode } = req.headers;
    if (mode === "generate") {
      generatedEmail(req, res);
    } else if (mode === "check") {
      checkEmail(req, res);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};
