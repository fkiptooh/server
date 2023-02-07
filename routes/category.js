const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const { create, 
        read, 
        update, 
        remove, 
        list,
        getSubcategory
     } = require("../controllers/category");
// const { route } = require("./auth");

//routes

router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subcategory/:_id", getSubcategory)



module.exports = router;
