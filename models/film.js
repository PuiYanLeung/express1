const { DataTypes } = require("sequelize");
const { connection } = require("../db");
//const User = require("./user");

const Film = connection.define("Film", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    duration: {
        type: DataTypes.INTEGER
    },
    restriction: {
        type: DataTypes.STRING
    },
    director: {
        type: DataTypes.STRING
    },
    casting: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 }
    },
    photoURL:{
        type: DataTypes.STRING
    }
}, {});

module.exports = Film;
