import fs from "fs";
import { Todo } from "../";
import { getTodos } from "./getTodos";

export const creatingTodo = (title: string) => {
  
  const todos = getTodos();
  const newTodo:Todo = {id : todos!.length + 1, title: title , completed : false}
  todos!.push(newTodo);
  fs.writeFileSync("todos.json", JSON.stringify(todos));
  return todos;
};
