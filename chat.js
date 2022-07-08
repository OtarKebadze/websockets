// const fs = require("fs");

// class Chat {
//     constructor(fileName){
//         this.file = fileName;
//     }
//     async saveAuthor(autor){
//     let data = await this.getAllAuthors();
//     console.log(data)
//     const {mail, nombre, apellido, edad , nick , avatar} = autor;
//     const usuario = {
//                 author:{
//                     id: mail,
//                     nombre: nombre,
//                     apellido:apellido,
//                     edad: edad ,
//                     nick:nick,
//                     avatar:avatar
//                 },
//                 text:[]
//             }
//     if (data==null) {
//     await fs.promises.writeFile(`${this.file}`, JSON.stringify([usuario]))
//     } else {
//     data=[...data,usuario]
//     await fs.promises.writeFile(`${this.file}`, JSON.stringify(data))
//     }
//     }
//     async saveMessage(message , id){
        
//     }
//     async getAllAuthors(){
//         try {
//             const lectura = await fs.promises.readFile(`${this.file}`, "utf-8");
//             let arr = JSON.parse(lectura);
//             console.log(arr)
//             return arr;
//           } catch {
//             return null;
//           }
//     }
//     async getId(id){
//         try {
//         const lectura = await this.getAllAuthors();
//         let coincidencia = lectura.find(a=> a.author.id == id)
//         console.log(coincidencia)
//         return coincidencia
//         } catch (error) {
//             console.error(error)
//         }
//     }   
// }

// const chat = new Chat("mensajes.txt");

// module.exports = chat;