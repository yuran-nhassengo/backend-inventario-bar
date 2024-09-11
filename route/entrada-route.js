const express = require("express");

const router = express.Router();

const {createEntrada} = require("../controller/entrada-controller")

router.post("/entrada/create-entrada",createEntrada);


module.exports = router