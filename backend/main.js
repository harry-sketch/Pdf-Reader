const filePath = "./data/document.pdf";

import { loadPdfPages } from "./prepare/prepare.js";
import { getTextSplit } from "./prepare/text-splitter.js";

const main = async () => {
  const docs = await loadPdfPages(filePath);

  const allSplits = await getTextSplit(docs);

  console.log(allSplits.length);
};

main();
