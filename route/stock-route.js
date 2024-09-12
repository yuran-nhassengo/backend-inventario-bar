const express = require("express");

const router = express.Router();

const {getStock,createStock,updateStock,updateStockAll } = require("../controller/stock-controller");

router.post("/create-stock",createStock);

router.get("/get-stock",getStock);

router.put("/update-stock",updateStock);

router.put("/update-stock-all",updateStockAll);


module.exports = router;