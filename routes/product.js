const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create} = require("../controllers/product");
// const { route } = require("./auth");

//routes

router.post("/product", authCheck, adminCheck, create);




module.exports = router;
