import { convert } from "html-to-text";
import { ConversationChain } from "langchain/chains";
import { generateLLM } from "./llm";
import { summerizerPrompt } from "./prompt";

export const summerizeArticle = async (
  content: string,
  apiKey: string,
  model: string
) => {
  const contentText = convert(content);

  const chain = new ConversationChain({
    llm: generateLLM(apiKey, model),
  });

  try {
    const { response } = await chain.call({
      input: `${summerizerPrompt}\n${contentText}`,
    });

    return response as string;
  } catch (err) {
    console.error("Error during generateArticleFromPrompt:", err);
    return null;
  }
};
