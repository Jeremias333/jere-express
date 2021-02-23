const Sequelize = require("sequelize");
const conn = require("../database/database");
const Category = require("../categories/Category");

const Article = conn.define("articles", {
	title:{
		type: Sequelize.STRING,
		allowNull: false
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false
	},
	body: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

Category.hasMany(Article); //UMA categoria tem muitos artigos
Article.belongsTo(Category); //UM Artigo pertence a uma categoria

// Article.sync({force:true});

module.exports = Article;