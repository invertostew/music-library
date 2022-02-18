const getDb = require('../services/db');

const createAlbumController = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;
  const { name, year } = req.body;

  try {
    await db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
      name,
      year,
      artistId,
    ]);

    res.status(201).json({ result: `Album '${name}' was added successfully.` });
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

const getAlbumsController = async (_, res) => {
  const db = await getDb();

  try {
    const [albums] = await db.query('SELECT * FROM Album');

    res.json(albums);
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

module.exports = {
  createAlbumController,
  getAlbumsController,
};
