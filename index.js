const { faker }= require('@faker-js/faker');
const fs = require("fs");
class Contenedor {
  constructor(nombreArchivo) {
    this.archivo = nombreArchivo;
  }
  async prods(){
    let prod = {
      title: faker.commerce.product(),
      price: faker.finance.amount(100,1000),
      thumbnail: faker.image.image()
    }
    return prod
  }
  async save(obj) {
    try {
      let data = await this.getAll();
      console.log(data)
      if (!data) {
        let arr = [];
        for (let i = 0; i <= 5; i++) {
          let prod=await this.prods();
          arr.push(prod)
        } 
        await fs.promises.writeFile(`${this.archivo}`, JSON.stringify(arr));
        console.log("ITEM AGREGADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getAll() {
    try {
      const lectura = await fs.promises.readFile(`${this.archivo}`, "utf-8");
      let arr = JSON.parse(lectura);
      return arr;
    } catch {
      return null;
    }
  }
}

let producto = new Contenedor("productos.txt")

module.exports = producto;
