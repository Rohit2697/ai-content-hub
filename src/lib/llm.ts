import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";

export const generateLLM = (
  apiKey: string,
  model: string
): ChatOpenAI<ChatOpenAICallOptions> => {
  return new ChatOpenAI({
    apiKey,
    model,
  });
};
