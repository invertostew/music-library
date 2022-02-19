const express = require('express');

const {
  getAlbumsController,
  getAlbumController,
  updateAlbumController,
  deleteAlbumController
} = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.route('/').get(getAlbumsController);

albumRouter
  .route('/:albumId')
  .get(getAlbumController)
  .patch(updateAlbumController)
  .delete(deleteAlbumController);

module.exports = albumRouter;
