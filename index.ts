import http from "http";

let todos = [
  { id: 1, title: "Learning Typescript", completed: false },
  { id: 2, title: "Learning React", completed: false },
  { id: 3, title: "Learning Angular", completed: false },
  { id: 4, title: "Learning Vue", completed: false },
  { id: 5, title: "Learning Svelte", completed: false },
  { id: 6, title: "Learning React Native", completed: false },
  { id: 7, title: "Learning Flutter", completed: false },
];

const server = http.createServer((req, res) => {
  if (req.url === "/todos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } else if (req.url === "/todo") {
    const myUrl = new URL(req.url, "http://localhost:3000");
    const id = Number(myUrl.searchParams.get("id"));
    const todo = todos.find(todo => todo.id === id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
  } else if (req.url === "/create") {
    const myUrl = new URL(req.url, "http://localhost:3000");
    const title = myUrl.searchParams.get("title") as string;
    const completed = myUrl.searchParams.get("completed") === "true";
    const id = todos.length + 1;
    todos.push({ id, title, completed });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } else if (req.url === "/update") {
    const myUrl = new URL(req.url, "http://localhost:3000");
    const id = Number(myUrl.searchParams.get("id"));
    const title = myUrl.searchParams.get("title");
    const completed = myUrl.searchParams.get("completed") === "true";
    const todo = todos.find(todo => todo.id === id);
    todo!.title = title as string;
    todo!.completed = completed;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } else if (req.url === "/delete") {
    const myUrl = new URL(req.url, "http://localhost:3000");
    const id = Number(myUrl.searchParams.get("id"));
    const todo = todos.find(todo => todo.id === id);
    todos = todos.filter(todo => todo.id !== id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
