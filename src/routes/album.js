const express = require('express');

const {
  getAlbumsController,
  getAlbumController,
} = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.route('/')
  .get(getAlbumsController);

albumRouter.route('/:albumId')
  .get(getAlbumController);

module.exports = albumRouter;
