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
    lang: {
        type: DataTypes.STRING
    },
    year: {
        type: DataTypes.INTEGER
    },
    duration: {
        type: DataTypes.INTEGER
    },
    director: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 }
    }, 
    userId: {
        type: DataTypes.INTEGER,
         references: {
             model: User,
             key: 'id'
         }
    }
}, {});

Film.hasOne(User, { foreignKey: 'userId' });
User.belongsTo(Film);

const main = async() => {
    try {
        await Film.sync({alter: true});
    } catch (error) {
        console.log(error);
    }
}

main();

module.exports = Film;
