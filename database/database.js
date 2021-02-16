const Sequelize = require("sequelize");
require("dotenv/config");

const conn = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	port: 3308,
	dialect: "mysql"
});

module.exports = conn;