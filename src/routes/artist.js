const express = require('express');

const {
  getArtistsController,
  createArtistController,
  getArtistContoller,
  updateArtistController,
  deleteArtistController,
} = require('../controllers/artist');

const artistRouter = express.Router();

artistRouter.route('/')
  .get(getArtistsController)
  .post(createArtistController);

artistRouter.route('/:artistId')
  .get(getArtistContoller)
  .patch(updateArtistController)
  .delete(deleteArtistController);

module.exports = artistRouter;
