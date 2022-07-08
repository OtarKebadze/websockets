const express = require("express");
const router = require("./router");
const app = express();
const bodyParser = require("body-parser");
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
const port = 8080;
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "./public/views_ejs/views/");
app.set("view engine", "ejs");
app.use("/api", router);

let messages = [];

socketServer.on("connection", (socket) => {
  console.log("NUEVO USUARIO CONECTADO");
  socket.emit("messages", messages);

  socket.on("new_message", (mensaje) => {
    messages.push(mensaje);

    socketServer.sockets.emit("messages", messages);
  });
});

httpServer.listen(port, () => {
  console.log("LEVANTANDO SERVIDOR");
});
