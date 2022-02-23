const express = require('express');

const {
  getAlbumsController,
  getAlbumController,
  updateAlbumController,
  deleteAlbumController
} = require('../controllers/albums');

const albumsRouter = express.Router();

albumsRouter.route('/').get(getAlbumsController);

albumsRouter
  .route('/:albumId')
  .get(getAlbumController)
  .patch(updateAlbumController)
  .delete(deleteAlbumController);

module.exports = albumsRouter;
