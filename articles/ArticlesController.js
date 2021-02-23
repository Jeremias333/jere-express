const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/", (req, res) => {
	res.send("Rota de artigos");
});

router.get("/admin", (req, res) => {

	Category.findAll().then(categories => {
		res.render("admin/articles/new", {categories: categories});
	});
	
});

router.post("/save", (req, res) => {
	var title = req.body.title;
	var body = req.body.body;
	var categoryId = req.body.category;

	Article.create({
		title: title,
		slug: slugify(title.toLowerCase()),
		body: body,
		categoryId: categoryId
	});
});

module.exports = router;