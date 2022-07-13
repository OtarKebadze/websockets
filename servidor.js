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

const normalizar = (data)=>{
let authorSchema = new norm.schema.Entity("authors",{},{idAttribute:"mail"});
let messageSchema = new norm.schema.Entity("messages" , {
  author: authorSchema
}, {idAttribute:"id"});
let chatSchema = new norm.schema.Entity("chats", {
  messages : [messageSchema]
})
const messagesToNormalize = {
  id:1,
  messages:data
}
const normalized = norm.normalize(messagesToNormalize, chatSchema);
return normalized
}



socketServer.on("connection",async(socket) => {
  console.log("NUEVO USUARIO CONECTADO");
  let dataFromClassChat = await chat.getAll();
  console.log(dataFromClassChat)
  let normalized = normalizar(dataFromClassChat)
  socket.emit("messages", normalized);
  socket.on("new_message", async (msg) => {
    await chat.saveAuthor(msg);
    let dataFromClassChat = await chat.getAll();
    let normalized = normalizar(dataFromClassChat)
    socketServer.sockets.emit("messages",normalized);
  });
});

httpServer.listen(port, () => {
  console.log("Server Up On Port : ", `${port}`);
});
