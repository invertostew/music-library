const express = require('express');

const {
  getAlbumsController,
} = require('../controllers/album');

const albumRouter = express.Router();

albumRouter.route('/')
  .get(getAlbumsController);

module.exports = albumRouter;
