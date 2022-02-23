const express = require('express');

const {
  getArtistsController,
  createArtistController,
  getArtistContoller,
  updateArtistController,
  deleteArtistController
} = require('../controllers/artists');
const { createAlbumController } = require('../controllers/albums');

const artistsRouter = express.Router();

artistsRouter.route('/').get(getArtistsController).post(createArtistController);

artistsRouter
  .route('/:artistId')
  .get(getArtistContoller)
  .patch(updateArtistController)
  .delete(deleteArtistController);

artistsRouter.route('/:artistId/albums').post(createAlbumController);

module.exports = artistsRouter;
