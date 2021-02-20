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

router.get("/admin", (req, res) => {
	Category.findAll().then(categories => {
		res.render("admin/categories/index", {categories: categories});
	});
});

router.post("/save", (req, res) => {
	var title = req.body.title;

	if(title != undefined){
		Category.create({
			title: title,
			slug: slugify(title.toLowerCase())
		}).then(() => {
			res.redirect("/categories/admin");
		});
	}else{
		res.redirect("/categories/admin/new");
	}
});

router.post("/delete", (req, res) => {
	var id = req.body.id;

	if(id != undefined){
		if(!isNaN(id)){
			Category.destroy({
				where:{
					id: id
				}
			}).then(() => {
				res.redirect("/categories/admin");
			});
		}else{
			res.redirect("/categories/admin");
		}
	}else{
		res.redirect("/categories/admin");
	}
});

module.exports = router;