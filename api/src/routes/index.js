const { Router } = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const key = '5fdfcc29684e4bf6bc65138809a89369';
const url = 'https://api.rawg.io/api/games';
const urlGenre = 'https://api.rawg.io/api/genres/';

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// TODO: --------------------- / GET - VIDEOGAMES / ----------------------------
router.get('/videogames', async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      let id = 1;
      const games = await axios.get(`${url}?key=${key}`)
      const formatGames = games.data.results.map(e => {
        let obj = {
          id: id++,
          name: e.name,
          description: e.description? e.description : "",
          release: e.released,
          platform: e.platforms.map(e => e.platform.name)
        }
        return obj;
      });

      if (!formatGames) throw new Error("No hay juegos que mostrar");
      res.status(200).send(formatGames)
    } else {
      let id = 1;
      const games = await axios.get(`${url}?search=${name}&key=${key}`)
      const formatGames = games.data.results.map(e => {
        let obj = {
          id: id++,
          name: e.name,
          description: [],
          release: e.released,
          platform: e.platforms.map(e => e.platform.name)
        }
        return obj;
      });

      if (!formatGames) throw new Error("No hay juegos que mostrar");
      res.status(200).send(formatGames)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})


// TODO: --------------------- / GET - GAME / ----------------------------
router.get('/videogames/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params;
  try {
    if (!idVideogame) throw new Error("No hay parametro ingresado");
    const game = await axios.get(`${url}${idVideogame}?key=${key}`);
    // const formatGames = game.data.results.map(e => {
    //   let obj = {
    //     id: id++,
    //     name: e.name,
    //     description: [],
    //     release: e.released,
    //     platform: e.platforms.map(e => e.platform.name)
    //   }
    //   return obj;
    // });
    res.status(200).send(game.data)
  } catch (error) {
    res.status(400).send(error.message)
  }
})


// TODO: --------------------- / / ----------------------------
// TODO: --------------------- / / ----------------------------
// TODO: --------------------- / / ----------------------------



module.exports = router;
