import { ServerResponse } from "node:http";
import { createTodoService } from "../service";
import { generateResponse, HTMLCONTENTTYPE, JSONCONTENTTYPE } from "../utils";

export const createTodoApi = (res: ServerResponse, URL: URL) => {
  const title = URL.searchParams.get("title");

  try {
    if (title) {
      const todos = createTodoService(title);
      if (todos) {
        generateResponse(res, JSONCONTENTTYPE, JSON.stringify(todos!));
      } else {
        throw new Error("Todo is undefined");
      }
    } else {
      throw new Error("Send a proper title please");
    }
  } catch (error) {
    console.log(error);
    generateResponse(res, HTMLCONTENTTYPE, "error.message", 501);
  }
};
