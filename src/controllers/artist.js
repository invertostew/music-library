const getDb = require('../services/db');

const createArtistController = async (req, res) => {
  const db = await getDb();

  try {
    await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
      req.body.name,
      req.body.genre
    ]);

    res.status(201).json({ result: 'Created artist' });
  } catch (error) {
    res.status(500).json({ error });
  }

  db.close();
};

module.exports = {
  createArtistController,
};
