import fs from "fs";
import { Todo } from "../";
import { getTodos } from "./getTodos";

export const creatingTodo = (todo: Todo) => {
  const todos = getTodos();
  todos!.push(todo);
  fs.writeFileSync("todos.json", JSON.stringify(todos));
  return todos;
};
