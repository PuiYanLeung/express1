const Film = require("../models/film");

const addfilm = async(name, genre, lang, year, duration, director, rating, userid) => {
    try {
        const newfilm = await Film.build({name, genre, lang, year, duration, director, rating, userid}); 
        await newfilm.save();
    } catch(error) {
        console.log(error);
    }
}

const listfilms = async() => {
    try {
        return await Film.findAll({
            attributes: ["name","genre", "lang", "year", "duration", "director", "rating", "userid"]
        });
    } catch(error) {
        console.log(error);
        return [];
    }
}


const findfilm = async(id) => {
    try {
        const film = await Film.findOne({
            attributes: ["name", "genre", "lang", "year", "duration", "director", "rating", "userid"],
            where: {id}
        });
        return film;
       
    } catch(error) {
        console.log(error);
        return [];
    }
}

const editfilm = async(name, newmovieName) => { 

        const film = await Film.update(
            {name: newmovieName},
            {where: {id}}
        );

        const noResult = (currentValue) => currentValue === 0;

        if(film.length === 1 && film.every(noResult)){
            throw new Error("No movie under this name");
        }        
        console.log(`Edited: ${name} to ${newmovieName}`);

}

const removefilm = async(id) => { 

        const film = await Film.destroy({where: {id}});
        console.log(film);

        if(user === 0){
            throw new Error("No film deleted!");
        }        
        console.log(`Removed: ${film} `);
}

module.exports = {
    addfilm,
    listfilms,
    findfilm,
    editfilm,
    removefilm
};