var express = require("express");
var router = express.Router();
const ctrlIndex = require("../controllers/index");

router.get("/", ctrlIndex.getIndex);
router.get("/heroes", ctrlIndex.getHeroesIndex);
router.get("/create-hero", ctrlIndex.getHeroesForm);
router.post("/create-hero", ctrlIndex.createNewHero);
router.post("/delete-hero/:heroid", ctrlIndex.deleteHero);
router.get("/update-hero/:heroid", ctrlIndex.getUpdatedForm);

module.exports = router;