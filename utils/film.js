const Film = require("../models/film");

const addfilm = async(req, res) => {
    try {
        const newfilm = await Film.build({ name: req.body.name, genre: req.body.genre,lang:  req.body.lang, year: req.body.year, duration: req.body.duration,director: req.body.director, rating: req.body.rating}); 
        await newfilm.save();
    } catch(error) {
        console.log(error);
    }
}

const listfilms = async() => {
    try {
        return await Film.findAll({
            attributes: ({ name: req.body.name, genre: req.body.genre,lang:  req.body.lang, year: req.body.year, duration: req.body.duration,director: req.body.director, rating: req.body.rating})
        });
    } catch(error) {
        console.log(error);
        return [];
    }
}


const findfilm = async(id) => {
    try {
        const film = await Film.findOne({
            attributes: ["name", "genre", "lang", "year", "duration", "director", "rating",],
            where: {id}
        });
        return film;
       
    } catch(error) {
        console.log(error);
        return [];
    }
}

const editfilm = async(id, newmovieName) => { 

        const film = await Film.update(
            {name: newmovieName},
            {where: {id}}
            
        );
//console.log("movie chaged")
        const noResult = (currentValue) => currentValue === 0;

        if(film.length === 1 && film.every(noResult)){
            throw new Error("No movie under this name");
        }        
        console.log(`Edited: {req.body.name} to {newmovieName}`);

}

const removefilm = async(id) => { 

        const film = await Film.destroy({where: {id}});
        //console.log(film);

        if(film === 0){
            throw new Error("No film deleted!");
        }        
        console.log(`Removed: {req.body.name} `);
}

module.exports = {
    addfilm,
    listfilms,
    findfilm,
    editfilm,
    removefilm
};