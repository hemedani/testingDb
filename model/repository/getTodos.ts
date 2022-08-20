import fs from "fs";
import { Todo } from "../todo";

export const getTodos: () => Todo[] | undefined = () => {
  const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));
  return todos;
};
