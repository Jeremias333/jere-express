const Sequelize = require("sequelize");
const conn = require("../database/database");

const Article = conn.define("articles", {
	tite:{
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

module.exports = Article;