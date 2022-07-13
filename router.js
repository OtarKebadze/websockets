const express = require("express");
const product =require("./index")
const router = express.Router();



/* PLANTILLAS */

/*--------------------------------------------------------------------------------------------------------------*/

router.get("/", (req,res)=>{
  res.render('index')
})
router.get("/products", async (req, res) => {
  let name = "hola"
  let products = await product.getAll() === '' ? '' : await product.getAll();
  res.render('main', {products, name})
  });


router.post("/products-test", async(req, res) => {
  for (let i = 0; i <= 5; i++) {
    await product.save(product.prods())
  }
  res.send(await product.getAll())
});

// CHAT
router.get("/chat" , async (req,res)=> {
res.render("messages")
})


module.exports = router;
