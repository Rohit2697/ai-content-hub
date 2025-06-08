import { parseArticleResponse, generateArticlepropmt } from "./prompt";

import { generateLLM } from "./llm";
import { ConversationChain } from "langchain/chains";
import { getUserMemory } from "./memory";

const Systemprompt = generateArticlepropmt;
export const generateArticleFromPrompt = async (
  prompt: string,
  userId: string,
  apiKey: string,
  model: string
) => {
  console.log("Article Generation Started");
  const chain = new ConversationChain({
    llm: generateLLM(apiKey, model),
    memory: getUserMemory(userId),
  });

  try {
    const { response } = await chain.call({
      input: `${Systemprompt}\nUser prompt: ${prompt}`,
    });

    // console.log("chain values", response);
    return parseArticleResponse(response);
  } catch (err) {
    console.error("Error during generateArticleFromPrompt:", err);
    return null;
  }
};
