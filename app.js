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
		]
	}).then(articles => {
		Category.findAll().then(categories => {
			res.render("index", {articles: articles, categories: categories});
		});
	});
	
	// res.send("Bem vindo ao site");
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