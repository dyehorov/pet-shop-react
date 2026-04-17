const { DataTypes } = require("sequelize");
const { Sequelize } = require('sequelize');

const sequelize = require('../database');

const Category = sequelize.define("category", {
    id : {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.TEXT,
    image: DataTypes.TEXT,
    slug: {
        type: DataTypes.STRING,
    }
});

// Category.sync({alter: true});


module.exports = Category;