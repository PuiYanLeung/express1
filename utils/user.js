const User = require("../models/user");

const listUsers = async() => {
    try {
        return await User.findAll({
            attributes: [ "email"]
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
            attributes: [ "email"],
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
const editUser = async(id, newEmail) => { 

        const user = await User.update(
            {email: newEmail},
            {where: {id}}
        );

        const noResult = (currentValue) => currentValue === 0;

        if(user.length === 1 && user.every(noResult)){
            throw new Error("No user edited!");
        }        
        console.log(`Edited: ${user} user ${newEmail}`);

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
    listUsers,
    findOneUser,
    editUser,
    removeUser
};