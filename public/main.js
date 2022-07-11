const socket = io();

let authorSchema = new normalizr.schema.Entity(
  "authors",
  {},
  { idAttribute: "mail" }
);
let messageSchema = new normalizr.schema.Entity(
  "messages",
  {
    author: authorSchema,
  },
  { idAttribute: "id" }
);
let chatSchema = new normalizr.schema.Entity("chats", {
  messages: [messageSchema],
});
const messagesToNormalize = {
  id: 1,
  messages: mensajes,
};

let form = document.getElementById("formu");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let mail = document.getElementById("mail").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let edad = document.getElementById("edad").value;
  let nick = document.getElementById("nick").value;
  let avatar = document.getElementById("avatar").value;
  let text = document.getElementById("text").value;
  const author = {
    author: {
      mail: mail,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      nick: nick,
      avatar: avatar,
    },
    text: text,
  };
  socket.emit("new_message", author);
  return false;
});

const crearEtiquetasMensaje = (message) => {
  let html = `
  <p>${message.author.nick}</p>
  <img src="${message.avatar}">
  <p>${message.text}</p>
  `;
  return html;
};

const agregarMensajes = (mensajes) => {
  let desnormalizado = normalizr.denormalize(
    mensajes.result,
    chatSchema,
    mensajes.entities
  );
  let messages = desnormalizado.messages;
  let mensNorm = JSON.stringify(mensajes);
  let mensDenorm = JSON.stringify(messages);
  let compresion = 100-(( mensDenorm.length * 100 )/ mensNorm.length);
  const mensajesFinal = messages
    .map((message) => crearEtiquetasMensaje(message))
    .join(" ");
  document.getElementById("compresion").innerHTML = `EL % DE COMPRESION ES DE ${compresion}`
  document.getElementById("mensajes").innerHTML = mensajesFinal;
};

socket.on("messages", (messages) => agregarMensajes(messages));
