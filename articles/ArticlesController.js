const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Rota de artigos");
});

router.get("/admin", (req, res) => {
	res.send("administrador artigos");
});

module.exports = router;