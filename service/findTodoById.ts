import { getTodo } from "../model";

export const findTodoByIdService = (id: number) => {
  return getTodo({ id });
};
