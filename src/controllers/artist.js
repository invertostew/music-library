const { restart } = require('nodemon');
const getDb = require('../services/db');

const getArtistsController = async (req, res) => {
  const db = await getDb();

  try {
    const [artists] = await db.query('SELECT * FROM Artist');

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

const createArtistController = async (req, res) => {
  const db = await getDb();

  try {
    await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
      req.body.name,
      req.body.genre,
    ]);

    res.status(201).json({ result: 'Created artist' });
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

const getArtistContoller = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;
  const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [
    req.params.artistId,
  ]);

  if (!artist) {
    return res.status(404).json({ error: 'Artist ID doesnt exist' });
  }

  res.json(artist);
};

const updateArtistController = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;
  const data = req.body;

  try {
    const [
      { affectedRows },
    ] = await db.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);

    if (!affectedRows) {
      return res.status(404).json({ error: 'Nothing was updated' });
    }

    res.json({ result: 'Artist updated' });
  } catch (err) {
    res.status(500);
  }

  db.close();
};

module.exports = {
  getArtistsController,
  createArtistController,
  getArtistContoller,
  updateArtistController,
};
