const getDb = require('../services/db');

const getArtistsController = async (_, res) => {
  const db = await getDb();

  try {
    const [artists] = await db.query('SELECT * FROM Artist');

    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: 'No artists were found.' });
  }

  db.close();
};

const createArtistController = async (req, res) => {
  const db = await getDb();
  const { name, genre } = req.body;

  try {
    await db.query('INSERT INTO Artist (name, genre) VALUES (?, ?)', [
      name,
      genre,
    ]);

    res.status(201).json({ result: `Artist '${name}' was added successfully.` });
  } catch (error) {
    res.status(500).json({ error: 'Parameters "name" and "genre" are required.' });
  }

  db.close();
};

const getArtistContoller = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;
  const [[artist]] = await db.query('SELECT * FROM Artist WHERE id = ?', [artistId]);

  (!artist)
    ? res.status(404).json({ error: 'Artist ID doesnt exist' })
    : res.json(artist);
};

const updateArtistController = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;
  const data = req.body;

  try {
    const [{ affectedRows }] = await db.query('UPDATE Artist SET ? WHERE id = ?', [data, artistId]);

    (!affectedRows)
      ? res.status(404).json({ error: 'Nothing was updated' })
      : res.json({ result: 'Artist updated' });
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

const deleteArtistController = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;

  try {
    const [{ affectedRows }] = await db.query('DELETE FROM Artist WHERE id = ?', [artistId]);

    (!affectedRows)
      ? res.status(404).json({ error: 'Nothing was deleted' })
      : res.json({ result: 'Artist deleted' });
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

module.exports = {
  getArtistsController,
  createArtistController,
  getArtistContoller,
  updateArtistController,
  deleteArtistController,
};
