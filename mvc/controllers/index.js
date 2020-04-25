const mongoose = require("mongoose");
const Hero = mongoose.model("Hero");

getIndex = function(req, res, next) {
    res.render("index", { title: "Mongoose" });
};

getHeroesIndex = function(req, res) {
    Hero.find((err, heroes) => {
        if (err) {
            return res.send({ error: err });
        }
        // console.log(heroes);
        res.render("heroes", { title: "Hall of Heroes", heroes: heroes });
    });
};

getHeroesForm = function(req, res) {
    res.render("create-hero", { title: "Create a hero" });
};

createNewHero = function({ body }, res) {
    let hero = {
        name: body.name,
        description: body.desc,
        stats: {
            strength: body.strength,
            endurence: body.endurence,
            perception: body.perception,
            charisma: body.charisma,
            intelligence: body.intelligence,
            agility: body.agility,
            luck: body.luck,
        },
    };
    body.origin && (hero.origin = body.origin);

    Hero.create(hero, (err, newHero) => {
        if (err) {
            return res.send({ error: err });
        }
        res.redirect("/heroes");
    });
};

deleteHero = function({ params }, res) {
    Hero.findByIdAndRemove(params.heroid, (err, hero) => {
        if (err) {
            return res.send({ error: err });
        }
        res.redirect("/heroes");
    });
};

getUpdatedForm = function({ params }, res) {
    Hero.findById(params.heroid, (err, hero) => {
        if (err) {
            res.send({ error: err });
        }
        res.render("update-hero", { title: "Upadte hero", hero: hero });
    });
};

module.exports = {
    getIndex,
    getHeroesIndex,
    getHeroesForm,
    createNewHero,
    deleteHero,
    getUpdatedForm,
};