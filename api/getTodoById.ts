import { ServerResponse } from "node:http";
import { findTodoByIdService } from "../service";

export const getTodoByIdApi = (res: ServerResponse, url: URL) => {
  // return findTodoByIdService(id);

  const id = Number(url.searchParams.get("id"));
  if (id) {
    const todo = findTodoByIdService(id);
    if (todo) {
      generateResponse(res, JSONCONTENTTYPE, JSON.parse(todo));
    } else {
      generateResponse(res, HTMLCONTENTTYPE, "we can not find this id", 404);
    }
  } else {
    generateResponse(res, HTMLCONTENTTYPE, "you should send a proper id", 404);
  }
};
