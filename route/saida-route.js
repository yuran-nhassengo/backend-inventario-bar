const express = require("express");

const router = express.Router();

const {createSaida} = require("../controller/saida-controller");

router.post("/saida/create-saida",createSaida)

module.exports = router;