import "dotenv/config";
import { filePath } from "./contants.js";
import { createPineconeVectorStore } from "./pinecone/db.js";
import { loadPdfPages } from "./prepare/prepare.js";
import { getTextSplit } from "./prepare/text-splitter.js";

const serverData = async () => {
  try {
    const vectorDb = await createPineconeVectorStore();

    const docs = await loadPdfPages(filePath);

    const documents = await getTextSplit(docs);

    await vectorDb.addDocuments(documents);
  } catch (error) {
    console.log("Something went wrong!!!", error);
  }
};

serverData();
