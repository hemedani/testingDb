import { ServerResponse } from "node:http";
import { getTodosService } from "../service";
import { generateResponse, HTMLCONTENTTYPE, JSONCONTENTTYPE } from "../utils";

export const getTodosApi = (res: ServerResponse) => {
  // return findTodoByIdService(id);
  try {
    const todos = getTodosService();
    generateResponse(res, JSONCONTENTTYPE, JSON.stringify(todos));
  } catch (error) {
    generateResponse(res, HTMLCONTENTTYPE, "we can not find this todos", 404);
  }
};
