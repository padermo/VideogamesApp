const { Router } = require('express');
const axios = require('axios');
const { Videogame, Genre } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const key = '5fdfcc29684e4bf6bc65138809a89369';
const url = 'https://api.rawg.io/api/games';
const urlGenre = 'https://api.rawg.io/api/genres';

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// TODO: --------------------- / GET - VIDEOGAMES / ----------------------------
// obtenemos todos los juegos y en caso de recibir una query obtendra solo los juegos que coincidan con el valor de la query
router.get('/videogames', async (req, res) => {
  const { search } = req.query;
  try {
    if (!search) {
      let datos = await axios.get(`${url}?key=${key}`)
      let formatData = datos.data.results.map(e => {
        let obj = {
          id: Number(e.id),
          name: e.name,
          description: e.description ? e.description : "No description",
          release: e.released,
          rating: e.rating,
          platform: e.platforms.map(e => e.platform.name),
          image: e.background_image,
          genre: e.genres.map(e => e.name)
        }
        return obj;
      });

      if (!formatData) throw new Error('Games not found');
      const dataDB = await Videogame.findAll({include: [{model: Genre}]});
      const dataSend = formatData.concat(dataDB)
      res.status(200).send(dataSend)
    } else {
      let datos = await axios.get(`${url}?search=${search}&key=${key}`)
      let formatData = datos.data.results.map(e => {
        let obj = {
          id: Number(e.id),
          name: e.name,
          description: e.description ? e.description : "No description",
          release: e.released,
          rating: e.rating,
          platform: e.platforms.map(e => e.platform.name),
          image: e.background_image,
          genre: e.genres.map(e => e.name)
        }
        return obj;
      });

      if (!formatData) throw new Error('Games not found');
      const dataDB = await Videogame.findAll({include: [{model: Genre}]});
      const dataSend = formatData.concat(dataDB)
      res.status(200).send(dataSend)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})


// TODO: --------------------- / GET - GAME / ----------------------------
// obtenemos el juego por id y sus generos
router.get('/videogames/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params;
  try {
    if (!idVideogame) throw new Error('Game not found');
    let data = await axios.get(`${url}/${idVideogame}?key=${key}`);
    let obj = {
      id: idVideogame,
      name: data.data.name,
      description: data.data.description ? data.data.description : "No description",
      release: data.data.released,
      rating: data.data.rating,
      platform: data.data.platforms.map(e => e.platform.name),
      image: data.data.background_image,
      genres: data.data.genres.map(e => e.name)
    }
    res.status(200).send(obj);
  } catch (error) {
    res.status(400).send(error.message);
  }
})


// TODO: --------------------- / GET - GENRES / ----------------------------
// obtenemos todos los generos de videojuegos
router.get('/genres', async (req, res) => {
  try {
    let genres = await axios.get(`${urlGenre}?key=${key}`);
    let id = 1;
    let formatGenres = genres.data.results.map(e => {
      let obj = {
        id: id++,
        name: e.name
      }
      return obj;
    });

    const existGenres = await Genre.findAll();

    if (!existGenres.length) {
      const createGenre = await Genre.bulkCreate(formatGenres)
      res.status(200).send(createGenre);
    } else {
      res.status(200).send(existGenres)
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})


// TODO: --------------------- / POST - VIDEOGAME / ----------------------------
// creamos juegos en la db
router.post('/videogame', async (req, res) => {
  const { name, description, release, rating, platform, image, genreId } = req.body;
  try {
    let existGenre = await Videogame.findOne({ where: { name } });
    
    if (!name || !description || !platform || !genreId.length) throw new Error("Missing data")

    if (!existGenre) {
      const createGame = await Videogame.create({ name, description, release, rating, platform, image });
      await createGame.addGenres(genreId);
      res.status(200).send(createGame);
    } else {
      res.status(400).send("Videogame already exists");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
})


// TODO: --------------------- / / ----------------------------



module.exports = router;
