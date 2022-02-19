const getDb = require('../services/db');

const createAlbumController = async (req, res) => {
  const db = await getDb();
  const { artistId } = req.params;
  const { name, year } = req.body;

  try {
    await db.query(
      'INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)',
      [name, year, artistId]
    );

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

const getAlbumController = async (req, res) => {
  const db = await getDb();
  const { albumId } = req.params;
  const [[album]] = await db.query('SELECT * FROM Album WHERE id = ?', [
    albumId
  ]);

  album
    ? res.json(album)
    : res.status(404).json({ error: 'Album does not exist.' });
};

const updateAlbumController = async (req, res) => {
  const db = await getDb();
  const { albumId } = req.params;
  const data = req.body;

  try {
    const [{ affectedRows }] = await db.query(
      'UPDATE Album SET ? WHERE id = ?',
      [data, albumId]
    );

    affectedRows
      ? res.json({ result: `Album ${albumId} was successfully updated.` })
      : res
          .status(404)
          .json({ error: 'Please provide either "name", "year", or both.' });
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

const deleteAlbumController = async (req, res) => {
  const db = await getDb();
  const { albumId } = req.params;

  try {
    const [{ affectedRows }] = await db.query(
      'DELETE FROM Album WHERE id = ?',
      [albumId]
    );

    affectedRows
      ? res.json({ result: `Album ${albumId} was successfully deleted.` })
      : res.status(404).json({ error: 'Album does not exist.' });
  } catch (error) {
    res.status(500).json(error);
  }

  db.close();
};

module.exports = {
  createAlbumController,
  getAlbumsController,
  getAlbumController,
  updateAlbumController,
  deleteAlbumController
};
