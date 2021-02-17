const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/", (req, res) => {
	res.send("Rota de categorias");
});

router.get("/admin/new", (req, res) => {
	res.render("admin/categories/new");
});

router.post("/save", (req, res) => {
	var title = req.body.title;

	if(title != undefined){
		Category.create({
			title: title,
			slug: slugify(title.toLowerCase())
		}).then(() => {
			res.redirect("/");
		});
	}else{
		res.redirect("/categories/admin/new");
	}
});

module.exports = router;