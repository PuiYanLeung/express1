const Film = require("../models/film");

const filmAPI = async() => {
    try {
        const newfilm1 = await Film.build({name: "Tenet", genre: "Science Fiction", year: 2020, duration: 143, restriction: "12", director: "Christopher Nolan", casting: "John David Washington, Robert Pattinson", rating: 4, photoURL: "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg"}); 
        const newfilm2 = await Film.build({name: "Tenet2", genre: "Science Fiction", year: 2020, duration: 143, restriction: "12", director: "Christopher Nolan", casting: "John David Washington, Robert Pattinson", rating: 4, photoURL: "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg"}); 
        const newfilm3 = await Film.build({name: "Tenet3", genre: "Science Fiction", year: 2020, duration: 143, restriction: "12", director: "Christopher Nolan", casting: "John David Washington, Robert Pattinson", rating: 4, photoURL: "https://upload.wikimedia.org/wikipedia/en/1/14/Tenet_movie_poster.jpg"});         
           
        await newfilm1.save();
        await newfilm2.save();
        await newfilm3.save();
    } catch(error) {
        console.log(error);
    }
}

const addfilm = async(req, res) => {
    try {
        const newfilm = await Film.build({name: req.body.name, genre: req.body.genre, year: req.body.year, duration: req.body.duration, restriction: req.body.restriction, director: req.body.director, casting: req.body.casting, rating: req.body.rating, photoURL: req.body.photoURL}); 
        await newfilm.save();
    } catch(error) {
        console.log(error);
    }
}

const listfilms = async() => {
    try {
        return await Film.findAll();
    } catch(error) {
        console.log(error);
        return [];
    }
}

const findfilm = async(id) => {
    try {
        const film = await Film.findOne({
            //attributes: ["name", "genre", "lang", "year", "duration", "director", "rating", "photoURL"],
            where: {id}
        });
        return film;
       
    } catch(error) {
        console.log(error);
        return [];
    }
}

const editfilm = async(id, newName) => { 

        const film = await Film.update(
            {name: newName},
            {where: {id}}
            
        );
        const noResult = (currentValue) => currentValue === 0;

        if(film.length === 1 && film.every(noResult)){
            throw new Error("No movie under this name");
        }        

        console.log(`Edited: ${film} film to  ${newName}`);

}

const removefilm = async(id) => { 

        const film = await Film.destroy({where: {id}});
        if(film === 0){
            throw new Error("No film deleted!");
        }        
        console.log(`Removed: ${film} film `);
}

module.exports = {
    filmAPI,
    addfilm,
    listfilms,
    findfilm,
    editfilm,
    removefilm
};