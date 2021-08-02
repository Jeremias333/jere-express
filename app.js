const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./database/database");

//controllers
const categoriesRouter = require("./categories/CategoriesController");
const articlesRouter = require("./articles/ArticlesController");

//models
const Article = require("./articles/Article");
const Category = require("./categories/Category");


// const all_routes = require('express-list-endpoints'); //para visualizar endpoints


require("dotenv/config");

const port = parseInt(process.env.PORT) || 80;


app.set("view engine", "ejs");

app.use(express.static("public"))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

conn.authenticate()
.then(() => {
	console.log("Conexão efetuada");
}).catch((err) => {
	console.log(err);
});

app.get("/", (req, res) => {

	Article.findAll({
		order: [
			['id', 'DESC']
		],
		limit: 4
	}).then(articles => {
		Category.findAll().then(categories => {
			res.render("index", {articles: articles, categories: categories});
		});
	});
	
	// res.send("Bem vindo ao site");
});

app.get("/category/:slug", (req, res) => {
	var slug = req.params.slug;
	Category.findOne({
		where:{
			slug:slug
		},
		include: [{model: Article}]
	}).then(category => {
		if(category != undefined){
			Category.findAll().then(categories => {
				res.render("index", {articles: category.articles, categories: categories});
			});
		}else{
			res.redirect("/")
		}
	}).catch(err => {
		res.redirect("/")
	});
});

app.get("/:slug", (req, res) => {
	var slug = req.params.slug;
	Article.findOne({
		where: {
			slug: slug
		}
	}).then(article => {
		if(article != undefined){
			Category.findAll().then(categories => {
				res.render("article", {article: article, categories: categories});
			});
		}else{
			res.redirect("/");
		}
	}).catch(error => {
		res.redirect("/");
		console.log(error);
	})
});

app.use("/categories", categoriesRouter);
app.use("/articles", articlesRouter);

// console.log(all_routes(app)); //printando todos endpoints

app.listen(port, () => {
	console.log("servidor rodando na porta "+ port);
});