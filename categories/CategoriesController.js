const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("Rota de categorias");
});

router.get("/admin", (req, res) => {
	res.send("administrador categorias");
});

module.exports = router;