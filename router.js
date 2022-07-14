const express = require("express");
const product = require("./index");
const router = express.Router();

/* PLANTILLAS */

/*--------------------------------------------------------------------------------------------------------------*/

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/products", (req, res) => {
  if (req.body.user == "") {
    res.redirect("/api/");
  } else {
    req.session.user = req.body.user;
    res.redirect("/api/products");
  }
});

router.get("/products", async (req, res) => {
  if (req.session.user == undefined) {
    res.redirect("/api/");
  } else {
    let name = req.session.user;
    let products =
      (await product.getAll()) === "" ? "" : await product.getAll();
    res.render("main", { products, name });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    console.log("HOPE TO SEE YOU SOON");
    if (req.session == undefined) {
      setTimeout(() => {
        res.redirect("/api/");
      }, 2000);
    }
  });
});

router.post("/products-test", async (req, res) => {
  for (let i = 0; i <= 5; i++) {
    await product.save(product.prods());
  }
  res.send(await product.getAll());
});

// CHAT
router.get("/chat", async (req, res) => {
  res.render("messages");
});

module.exports = router;
