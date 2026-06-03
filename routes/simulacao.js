const express = require("express");

const router = express.Router();

const {
    simular
} = require("../controllers/simulacaoController");

router.post("/simular", simular);

module.exports = router;
