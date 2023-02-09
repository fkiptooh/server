const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, listAll, remove, read } = require("../controllers/product");
// const { route } = require("./auth");

//routes

router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll); // products/10 so we cant break the site/ server when quering the database.
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);




module.exports = router;
