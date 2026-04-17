const { DataTypes } = require("sequelize");
const { Sequelize } = require('sequelize');

const sequelize = require('../database');

const Product = sequelize.define("product", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    discont_price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    slug: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
});

// Product.sync({alter: true});

module.exports = Product;