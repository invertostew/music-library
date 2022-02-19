const express = require('express');

const {
  getArtistsController,
  createArtistController,
  getArtistContoller,
  updateArtistController,
  deleteArtistController
} = require('../controllers/artist');
const { createAlbumController } = require('../controllers/album');

const artistRouter = express.Router();

artistRouter.route('/').get(getArtistsController).post(createArtistController);

artistRouter
  .route('/:artistId')
  .get(getArtistContoller)
  .patch(updateArtistController)
  .delete(deleteArtistController);

artistRouter.route('/:artistId/album').post(createAlbumController);

module.exports = artistRouter;
