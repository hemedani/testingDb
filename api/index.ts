import { IncomingMessage, ServerResponse } from "node:http";
import { generateResponse } from "../utils";
import { getTodoByIdApi } from "./getTodoById";
import { getTodosApi } from "./getTodosApi";

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  const myUrl = new URL(req.url!, "http://localhost:3000");
  switch (myUrl.pathname) {
    case "/todos":
      return getTodosApi(res);
    case "/todo":
      return getTodoByIdApi(res, myUrl);
    default:
      return generateResponse(res, "text/html", "nothing to say for now");
  }
};
