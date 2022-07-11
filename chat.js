const fs = require("fs");

class Chat {
    constructor(fileName){
        this.file = fileName;
    }
    async saveAuthor(obj){
    let data = await this.getAllAuthors();

    if (data==null) {
    obj.id=1
    data.push(obj)
    await fs.promises.writeFile(`${this.file}`, JSON.stringify([usuario]))
    } else {
    obj.id= (data.length)+1;
    data=[...data,obj]
    await fs.promises.writeFile(`${this.file}`, JSON.stringify(data))
    }
    }
    async saveMessage(message , id){
        
    }
    async getAllAuthors(){
        try {
            const lectura = await fs.promises.readFile(`${this.file}`, "utf-8");
            let arr = JSON.parse(lectura);

            return arr;
          } catch {
            return null;
          }
    }
    async getId(id){
        try {
        const lectura = await this.getAllAuthors();
        let coincidencia = lectura.find(a=> a.author.id == id)

        return coincidencia
        } catch (error) {
            console.error(error)
        }
    }   
}

const chat = new Chat("mensajes.txt");

module.exports = chat;