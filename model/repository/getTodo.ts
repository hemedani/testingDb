import { Todo } from "../todo";
import { getTodos } from "./getTodos";

export const getTodo = (todo: Partial<Todo>) => {
  const todos = getTodos();
  if (!todos) {
    return undefined;
  }

  if (todo.id) {
    return todos.find(t => t.id === todo.id);
  }
  if (todo.title) {
    return todos.find(t => t.title === todo.title);
  }

  if (todo.completed) {
    return todos.find(t => t.completed === todo.completed);
  }

  return undefined;
};
