const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");

router.get("/", (req, res) => {
	res.send("Rota de artigos");
});

router.get("/admin", (req, res) => {

	Category.findAll().then(categories => {
		res.render("admin/articles/new", {categories: categories});
	});
	
});

module.exports = router;