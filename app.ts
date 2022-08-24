// import { IncomingMessage, Server, ServerResponse } from "node:http";
import { handleRequest } from "./api";
const express = require("express");

const app = express(handleRequest);

app.get("/", () => {
  console.log("server is running");
});
app.listen(3000);
