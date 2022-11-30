const express = require("express");
const router = express.Router();
const pokedex = require("../db/pokedex.json");

/* GET All Pokemon */
router.get("/", function (req, res, next) {
  res.json(pokedex);
});

/* GET Pokemon by Id. */
router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  if (id == "hp") {
    return next();
  }
  const pokemon = pokedex.filter((p) => p.id == id);
  if (pokemon.length > 0) {
    res.status(200).json(pokemon);
  } else {
    res.status(404).json({ message: `Error fetching pokemon by id : ${id}` });
  }
  return;
});

/* GET Pokemon by English Name */
router.get("/name/:name", function (req, res, next) {
  const engName = req.params.name;
  const pokemon = pokedex.filter((p) => p.name.english == engName);
  if (pokemon.length > 0) {
    res.status(200).json(pokemon);
  } else {
    res.status(404).json({
      message: `Error fetching pokemon with the english name : ${engName}`,
    });
  }
  return;
});

/* GET Pokemon by Type */
router.get("/type/:type", function (req, res, next) {
  const type = req.params.type.toLowerCase();
  const capitializedType = type[0].toUpperCase() + type.slice(1);
  const pokemons = pokedex.filter((p) => p.type.includes(capitializedType));
  if (pokemons.length > 0) {
    res.status(200).json(pokemons);
  } else {
    res.status(404).json({
      message: `Error fetching pokemon with the type : ${type}`,
    });
  }
  return;
});

/* GET Pokemon by HP */
router.get("/hp", function (req, res, next) {
  const { lt, gt, lte, gte } = req.query;
  if (req.query == {}) {
    return res.status(404).json({ message: "No queries supplied." });
  }
  const pokemons = pokedex.filter((p) => {
    const hp = p.base.HP;
    if (hp < lt || hp > gt || hp <= lte || hp >= gte) {
      return p;
    }
  });
  if (pokemons.length > 0) {
    res.status(200).json(pokemons);
  } else {
    res.status(404).json({
      message: `Error fetching pokemon with the query ${req.query}`,
    });
  }
  return;
});

module.exports = router;
