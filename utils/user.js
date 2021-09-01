const User = require("../models/user");

const addUser = async(name, passwordHash, first_name, last_name, email, membership) => { //add Pui 202109011122
    try {
        const newUser = await User.build({name, passwordHash, first_name, last_name, email, membership}); //add Pui 202109011122
        newUser.save();
    } catch(error) {
        console.log(error);
    }
}

const listUsers = async() => {
    try {
        return await User.findAll({});
    } catch(error) {
        console.log(error);
        return [];
    }
}

const editUser = async(oldName, newName) => { //add Pui 202109011122
    try {
        const user = await User.update( {name: newName}, {where: {name: oldName}}); //add Pui 202109011122
        console.log(`Edited: ${user} user`);
    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    addUser,
    listUsers,
    editUser
};