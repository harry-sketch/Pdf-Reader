import "dotenv/config";
import { serverData } from "./server.js";

const main = async () => {
  const resp = await serverData();

  console.log(resp);
};

main();
