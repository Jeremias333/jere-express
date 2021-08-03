const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/admin", (req, res) => {
    res.send("Listagem de usuários");
});

router.get("/admin/create", (req, res) => {
    res.render("admin/users/create")
});

router.post("/create", (req, res) => {
    email = req.body.email;
    password = req.body.password;

    res.json({email, password});
});

module.exports = router;