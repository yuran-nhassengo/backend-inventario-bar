const express = require("express");

const router = express.Router();

const {getStock,createStock} = require("../controller/stock-controller");

router.post("/create-stock",createStock);

router.get("/get-stock",getStock);


module.exports = router;