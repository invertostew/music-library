const express = require('express');

const {
  getArtistsController,
  createArtistController,
  getArtistContoller,
  updateArtistController,
  deleteArtistController,
} = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.get('/', getArtistsController);
artistRouter.post('/', createArtistController);

artistRouter.get('/:artistId', getArtistContoller);
artistRouter.patch('/:artistId', updateArtistController);
artistRouter.delete('/:artistId', deleteArtistController);

module.exports = artistRouter;
