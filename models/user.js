const { DataTypes } = require("sequelize");
const { connection } = require("../db");

const User = connection.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
       allowNull: false
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["email"] }],
  }
);

const main = async() =>{
    try{
        await User.sync({alter: true});
    }catch(error){
        console.log(error);
    }
}

main();

module.exports = User;