import { readFileSync } from "node:fs";
import { Document } from "@langchain/core/documents";
import { PDFParse } from "pdf-parse";

export const loadPdfPages = async (filePath) => {
  const parser = new PDFParse({
    data: new Uint8Array(readFileSync(filePath)),
  });

  try {
    const { pages } = await parser.getText();

    const docs = pages.map(
      ({ num, text }) =>
        new Document({
          id: num,
          pageContent: text,
          metadata: {
            source: filePath,
            page: num - 1,
          },
        }),
    );

    return docs;
  } finally {
    parser.destroy();
  }
};
