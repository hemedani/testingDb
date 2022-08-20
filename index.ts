import fs from "fs";
import http, { ServerResponse } from "http";
import { generateResponse } from "./generateResponse";
// var todos = fs.readFileSync('todos.json')
const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));

generateResponse(res,contentType,data,code) 


const getTodos = (res: ServerResponse) => {
  return generateResponse(
    res,
    "application/json",
    JSON.stringify(todos),
  );
};

const getTodo = (res: ServerResponse, url: URL) => {
  const id = Number(url.searchParams.get("id"));
  if (id) {
    const todo = todos.find((todo: { id: number }) => todo.id === id);
    if (todo) {
      generateResponse(res, "application/json", JSON.stringify(todo));
    } else {
      generateResponse(res, "text/html", "we ca not found this id", 404);
    }
  } else {
    generateResponse(res, "text/html", "you should send a proper id", 404);
  }
};

const createTodo = (res: ServerResponse, url: URL) => {
  const title = url.searchParams.get("title");
  if (title) {
    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
    };
    todos.push(newTodo);
    fs.writeFileSync("todos.json", JSON.stringify(todos));
    generateResponse(res, "application/json", JSON.stringify(todos));
  } else {
    generateResponse(res, "text/html", "you should send a proper title", 404);
  }
};

const server = http.createServer((req, res) => {
  const myUrl = new URL(req.url!, "http://localhost:3000");
  switch (myUrl.pathname) {
    case "/todos":
      return getTodos(res);
    case "/todo":
      return getTodo(res, myUrl);
    case "/create":
      return createTodo(res, myUrl);
    default:
      return generateResponse(res, "text/html", "Hello World");
  }
  // } else if (req.url === "/create") {
  //   const myUrl = new URL(req.url, "http://localhost:3000");
  //   const title = myUrl.searchParams.get("title") as string;
  //   const completed = myUrl.searchParams.get("completed") === "true";
  //   const id = todos.length + 1;
  //   todos.push({ id, title, completed });
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(todos));
  // } else if (req.url === "/update") {
  //   const myUrl = new URL(req.url, "http://localhost:3000");
  //   const id = Number(myUrl.searchParams.get("id"));
  //   const title = myUrl.searchParams.get("title");
  //   const completed = myUrl.searchParams.get("completed") === "true";
  //   const todo = todos.find((todo: { id: number }) => todo.id === id);
  //   todo!.title = title as string;
  //   todo!.completed = completed;
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(todos));
  // } else if (req.url === "/delete") {
  //   const myUrl = new URL(req.url, "http://localhost:3000");
  //   const id = Number(myUrl.searchParams.get("id"));
  //   const todo = todos.find((todo: { id: number }) => todo.id === id);
  //   todos = todos.filter((todo: { id: number }) => todo.id !== id);
  //   res.writeHead(200, { "Content-Type": "application/json" });
  //   res.end(JSON.stringify(todos));
  // } else {
  //   res.writeHead(404, { "Content-Type": "text/plain" });
  //   res.end("Not Found");
  // }
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});


