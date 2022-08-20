import { ServerResponse } from "http";

export function generateResponse (
    res: ServerResponse,
    contentType: string,
    data: string,
    code: number = 200,
  ) {
    res.writeHead(code, { "Content-Type": contentType });
    return res.end(data);
  };

  