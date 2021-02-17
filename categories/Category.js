const Sequelize = require("sequelize");
const conn = require("../database/database");

const Category = conn.define("categories", {
	title:{
		type: Sequelize.STRING,
		allowNull: false
	},
	slug: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

// Category.sync({force:true}); //para syncronizar as tabelas.

module.exports = Category;