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

module.exports = {
  getArtistsController,
  createArtistController,
};
