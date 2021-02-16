const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./database/database");
const categoriesRouter = require("./categories/CategoriesController");
const articlesRouter = require("./articles/ArticleController");

const all_routes = require('express-list-endpoints');


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
	res.render("index");
	// res.send("Bem vindo ao site");
});

app.use("/categories", categoriesRouter);
app.use("/articles", articlesRouter);

console.log(all_routes(app));
app.listen(port, () => {
	console.log("servidor rodando na porta "+ port);
});