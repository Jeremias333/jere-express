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

router.get("/admin/edit/:id", (req, res) => {
	var id = req.params.id;
	
	if(isNaN(id)){			
		res.redirect("/categories/admin");
	}

	Category.findByPk(id).then(category => {
		if(category != undefined){
			res.render("admin/categories/edit", {category: category});
		}else{
			res.redirect("/categories/admin");
		}
	}).catch(err => {
		console.log(err)
		res.redirect("/categories/admin");
	});
	
});

router.post("/update", (req, res) => {
	var id = req.body.id;
	var title = req.body.title;

	Category.update({title: title, slug: slugify(title.toLowerCase())}, {
		where: {
			id:id
		}
	}).then(() => {
		res.redirect("/categories/admin")
	});
});

module.exports = router;