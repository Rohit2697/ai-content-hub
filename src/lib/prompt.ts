export const parseArticleResponse = (text: string) => {
  const title =
    text
      .match(/Title:\s*(.*)/i)?.[1]
      ?.trim()
      .replaceAll("*", "")
      .trim() || "";
  const description =
    text
      .match(/Description:\s*(.*)/i)?.[1]
      ?.trim()
      .replaceAll("*", "")
      .trim() || "";
  const tags =
    text
      .match(/Tags:\s*(.*)/i)?.[1]
      ?.trim()
      .replaceAll("*", "")
      .trim() || "";
  const contentText = text.match(/Content:\s*([\s\S]*)/i)?.[1]?.trim() || "";
  const htmlMatch = contentText.match(/```html\s*([\s\S]*?)\s*```/i);
  const html = htmlMatch ? htmlMatch[1] : contentText;

  return { title, description, tags, content: html };
};

export function parseSummaryJsonBlock(
  markdown: string
): { summary: string } | null {
  try {
    // Remove the ```json code block markers

    const jsonString = markdown
      .replace(/^```json\s*/, "") // Remove opening ```json (with optional newlines/spaces)
      .replace(/```$/, "")
      // Remove closing ```
      .trim();

    const parsed = JSON.parse(jsonString);
    if (typeof parsed.summary === "string") {
      return { summary: parsed.summary };
    } else {
      console.error("Missing summary key or invalid format.");
      return null;
    }
  } catch (err) {
    console.error("Error parsing summary:", err);
    return null;
  }
}
export const generateArticlepropmt = `
You are an expert article writer. Based on the user's prompt, you must return:

- Title: A clear, relevant article title.
- Description: A short summary.
- Tags: Comma-separated tags starting with '#' (e.g. "#reactjs, #nodejs").
- Content: HTML-formatted article body using appropriate tags like <h1>, <p>, <ul>, etc.

Keep it informative, clean, and suitable for a blog.
`;

export const summerizerPrompt = `Summarize the following article in 3-4 short paragraphs, focusing on the main ideas and key takeaways. Return the result as a JSON object in the following format:
{
  "summary": "Your summary here"
}
Here is the article content:`;
