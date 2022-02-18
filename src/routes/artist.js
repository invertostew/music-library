const express = require('express');

const {
  getArtistsController,
  createArtistController,
  getArtistContoller,
  updateArtistController,
} = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.get('/', getArtistsController);
artistRouter.post('/', createArtistController);

artistRouter.get('/:artistId', getArtistContoller);
artistRouter.patch('/:artistId', updateArtistController);

module.exports = artistRouter;
