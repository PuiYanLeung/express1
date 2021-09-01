const User = require("../models/user");

const addUser = async(name, passwordHash, first_name, last_name, email, membership) => { //add Pui 202109011122
    try {
        const newUser = await User.build({name, passwordHash, first_name, last_name, email, membership}); //add Pui 202109011122
        await newUser.save();
    } catch(error) {
        console.log(error);
    }
}

const listUsers = async() => {
    try {
        return await User.findAll({
            attributes: ["name", "first_name", "last_name", "email"]
        });
    } catch(error) {
        console.log(error);
        return [];
    }
}

//find single User
const findOneUser = async(id) => {
    try {
        const user = await User.findOne({
            attributes: ["name", "first_name", "last_name", "email"],
            where: {id}
        });
        return user;
        // const {passwordHash, ...data} = user;
        // return data;
    } catch(error) {
        console.log(error);
        return [];
    }
}

//edit User
const editUser = async(id, newName) => { 

        const user = await User.update(
            {name: newName},
            {where: {id}}
        );

        const noResult = (currentValue) => currentValue === 0;

        if(user.length === 1 && user.every(noResult)){
            throw new Error("No user edited!");
        }        
        console.log(`Edited: ${user} user ${newName}`);

}

//delete User
const removeUser = async(id) => { 

        const user = await User.destroy({where: {id}});
        console.log(user);

        if(user === 0){
            throw new Error("No user deleted!");
        }        
        console.log(`Removed: ${user} user`);
}

module.exports = {
    addUser,
    listUsers,
    findOneUser,
    editUser,
    removeUser
};