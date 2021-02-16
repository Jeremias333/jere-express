const express = require("express");
const router = express.Router();

router.get("/articles/ah", (req, res) => {
	res.send("Rota de artigos");
});

router.get("/articles", (req, res) => {
	res.send("administrador artigos");
});

module.exports = router;