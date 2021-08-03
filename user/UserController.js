const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get("/admin", (req, res) => {
    res.send("Listagem de usuários");
});

router.get("/admin/create", (req, res) => {
    res.render("admin/users/create")
});

router.post("/create", (req, res) => {
    email = req.body.email;
    password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    // console.log(salt)
    var hash = bcrypt.hashSync(password, salt);
    // console.log(hash)

    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err);
        res.redirect("/")
    });
});

module.exports = router;