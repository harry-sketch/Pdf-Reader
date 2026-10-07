import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const getTextSplit = async (docs) => {
  const textsplitters = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const allTexts = await textsplitters.splitDocuments(docs);

  return allTexts;
};
