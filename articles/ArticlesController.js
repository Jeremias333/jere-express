const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin", (req, res) => {
	Article.findAll({
		include: [{model: Category}] //join com sequelize
	}).then(articles => {
		res.render("admin/articles/index", {articles: articles});
	});
});

router.get("/admin/new", (req, res) => {

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
	}).then(() => {
		res.redirect("/articles/admin");
	});
});

router.post("/delete", (req, res) => {
	var id = req.body.id;

	if(id != undefined){
		if(!isNaN(id)){
			Article.destroy({
				where:{
					id: id
				}
			}).then(() => {
				res.redirect("/articles/admin");
			});
		}else{
			res.redirect("/articles/admin");
		}
	}else{
		res.redirect("/articles/admin");
	}
});


router.get("/admin/edit/:id", (req, res) => {
	var id = req.params.id;

	if(isNaN(id)){
		res.redirect("/articles/admin");
	}

	Article.findByPk(id).then(article => {
		if(article != undefined){
			Category.findAll().then(categories =>{
				res.render("admin/articles/edit", {article: article, categories: categories});
			});
		}else{
			res.redirect("/articles/admin")
		}
	}).catch(err => {
		console.log(err);
		res.redirect("articles/admin");
	});
});

router.post("/update", (req, res) => {
	var id = req.body.id;
	var title = req.body.title;
	var body = req.body.body;
	var categoryId = req.body.category;

	Article.update({
		title: title,
		slug: slugify(title.toLowerCase()),
		body: body,
		categoryId: categoryId
	}, {where: {id: id}}).then(() => {
		res.redirect("/articles/admin")
	});
});

router.get("/page/:num", (req, res) => {
	var page = req.params.num;
	var offset = 0;

	if(isNaN(page) || page == 1){
		offset = 0;
	}else{
		offset = (parseInt(page) - 1) * 4;
		// console.log("Entrei aqui", offset)
	}

	Article.findAndCountAll({
		limit: 4,
		offset: offset,
		order: [
			['id', 'DESC']
		],
	}).then(articles => {
		// console.log(offset)
		var next;
		if(offset + 4 >= articles.count){
			next = false;
		}else{
			next = true;
		}

		var result = {
			page: parseInt(page),
			next: next,
			articles: articles
		}

		Category.findAll().then(categories => {
			res.render("admin/articles/page", {result: result, categories: categories});
		});
		// res.json(result);
	});
});

module.exports = router;