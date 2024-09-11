const express = require("express");

const router = express.Router();

const {getStock,createStock,updateStock} = require("../controller/stock-controller");

router.post("/create-stock",createStock);

router.get("/get-stock",getStock);

router.put("/update-stock",updateStock)


module.exports = router;