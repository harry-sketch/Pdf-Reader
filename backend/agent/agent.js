import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import { groq } from "../groq-client/groq-client.js";
import { createPineconeVectorStore } from "../pinecone/db.js";

export const runAgent = async () => {
  const rl = createInterface({
    input,
    output,
  });

  const vectorStore = await createPineconeVectorStore();

  try {
    while (true) {
      const question = await rl.question("You: ");

      if (question.toLowerCase() === "bye") {
        return "Good Bye";
      }

      const reterivelData = await vectorStore.similaritySearch(question, 3);

      const context = reterivelData
        .map(({ pageContent }) => pageContent)
        .join("\n\n");

      const system_prompt =
        "You are an assistant names Sara for question-answering tasks. Use the following pieces of retrievel context to answer the question. If you do not know the answer say i do not know. Reply in a very humble and polite way";

      const user_query = `
           Question: ${question}
           Relevant Context: ${context}
           Answer:  
      `;

      const completions = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: system_prompt,
          },

          {
            role: "user",
            content: user_query,
          },
        ],
        model: "openai/gpt-oss-20b",
      });

      console.log(`Assistant: ${completions.choices[0].message.content}`);
    }
  } catch (error) {
    console.log("Something went wrong", error);
  } finally {
    rl.close();
  }
};
