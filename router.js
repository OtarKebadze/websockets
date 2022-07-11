const fs = require("fs");
const express = require("express");
const producto =require("./index")
const router = express.Router();

/* PLANTILLAS */

/*--------------------------------------------------------------------------------------------------------------*/

router.get("/", async (req, res) => {
  let productos = await producto.getAll() === '' ? '' : await producto.getAll();
  res.render('index', {productos})
  });


router.post("/productos-test", async(req, res) => {
  for (let i = 0; i <= 5; i++) {
    await producto.save(producto.prods())
  }
  res.send(await producto.getAll())
});

// CHAT
router.get("/chat" , async (req,res)=> {
res.render("messages")
})


module.exports = router;
