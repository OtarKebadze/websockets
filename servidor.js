const express = require("express");
const router = require("./router");
let fs = require("fs")
const app = express();
const chat = require("./chat");
const bodyParser = require("body-parser");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
let chats = JSON.parse(fs.readFileSync("mensajes.txt" , "utf-8"));
const port = 8080;
const print= require("./print")
const norm = require("normalizr");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "./public/views_ejs/views/");
app.set("view engine", "ejs");
app.use("/api", router);

let authorSchema = new norm.schema.Entity("authors",{},{idAttribute:"mail"});
let messageSchema = new norm.schema.Entity("messages" , {
  author: authorSchema
}, {idAttribute:"id"});
let chatSchema = new norm.schema.Entity("chats", {
  messages : [messageSchema]
})
const messagesToNormalize = {
  id:1,
  messages:chats
}
const normalizado = norm.normalize(messagesToNormalize, chatSchema);
print(normalizado)

socketServer.on("connection", (socket) => {
  console.log("NUEVO USUARIO CONECTADO");
  socket.emit("messages", normalizado);
  socket.on("new_message", async (obj) => {
    await chat.saveAuthor(obj);
    socketServer.emit("messages",normalizado);
  });
});

httpServer.listen(port, () => {
  console.log("LEVANTANDO SERVIDOR");
});
