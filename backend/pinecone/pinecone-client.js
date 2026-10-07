import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const pineconeClient = new PineconeClient();

export const pineconeIndex = pineconeClient.Index(process.env.PINECONEINDEX);
