import { PineconeStore } from "@langchain/pinecone";
import { embeddings } from "./embedding-config.js";
import { pineconeIndex } from "./pinecone-client.js";

export const createPineconeVectorStore = async () => {
  try {
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      maxConcurrency: 5,
      pineconeIndex,
    });

    return vectorStore;
  } catch (error) {
    console.log({ error });
    process.exit(1);
  }
};
