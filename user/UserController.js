const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/admin", (req, res) => {
    res.send("Listagem de usuários");
});

router.get("/admin/create", (req, res) => {
    res.send("Rota de criar usuários.")
});

module.exports = router;