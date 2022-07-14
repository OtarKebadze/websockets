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


let form = document.getElementById("formu");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let mail = document.getElementById("mail").value;
  let name = document.getElementById("name").value;
  let lastName = document.getElementById("lastName").value;
  let age = document.getElementById("age").value;
  let nick = document.getElementById("nick").value;
  let avatar = document.getElementById("avatar").value;
  let text = document.getElementById("text").value;
  const author = {
    author: {
      mail: mail,
      nombre: name,
      apellido: lastName,
      edad: age,
      nick: nick,
      avatar: avatar,
    },
    text: text,
  };
  socket.emit("new_message", author);
  return false;
});

const createTags = (message) => {
  let html = `
  <p>${message.author.nick}</p>
  <img src="${message.avatar}">
  <p>${message.text}</p>
  `;
  return html;
};

const addMessages = (messagesFromSocket) => {
  let denormalizedMessages = normalizr.denormalize(
    messagesFromSocket.result,
    chatSchema,
    messagesFromSocket.entities
  );
  let messages = denormalizedMessages.messages;
  let messNorm = JSON.stringify(messages);
  let messDenorm = JSON.stringify(messages);
  let compression = 100-(( messDenorm.length * 100 )/ messNorm.length);
  const finalMessage = messages
    .map((message) => createTags(message))
    .join(" ");
  document.getElementById("compression").innerHTML = `EL % DE COMPRESION ES DE ${compression}`
  document.getElementById("messages").innerHTML = finalMessage;
};

socket.on("messages", (messages) => addMessages(messages));
