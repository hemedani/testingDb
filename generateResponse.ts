import { ServerResponse } from "http";

export const generateResponse = (
  res: ServerResponse,
  contentType: string,
  data: string,
  code: number = 200,
) => {
  res.writeHead(code, { "Content-Type": contentType });
  return res.end(data);
};
