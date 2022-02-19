const { expect } = require('chai');
const request = require('supertest');

const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update album', () => {
  let db;
  let albums;
  beforeEach(async () => {
    db = await getDb();

    await Promise.all([
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Radiohead',
        'rock'
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Gorillaz',
        'pop'
      ]),
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
        'Red Hot Chili Peppers',
        'rock'
      ])
    ]);

    const [[radiohead]] = await db.query(
      'SELECT id FROM Artist WHERE name = ?',
      ['Radiohead']
    );
    const [[gorillaz]] = await db.query(
      'SELECT id FROM Artist WHERE name = ?',
      ['Gorillaz']
    );
    const [[rhcp]] = await db.query('SELECT id FROM Artist WHERE name = ?', [
      'Red Hot Chili Peppers'
    ]);

    await Promise.all([
      db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
        'OK Computer',
        1997,
        radiohead.id
      ]),
      db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
        'Plastic Beach',
        2010,
        gorillaz.id
      ]),
      db.query('INSERT INTO Album (name, year, artistId) VALUES (?, ?, ?)', [
        'Californication',
        1999,
        rhcp.id
      ])
    ]);

    [albums] = await db.query('SELECT * from Album');
  });

  afterEach(async () => {
    await db.query('DELETE FROM Album');
    await db.query('DELETE FROM Artist');
    await db.close();
  });

  describe('/album/:albumId', () => {
    describe('PATCH', () => {
      it('updates a single album with the correct id', async () => {
        const album = albums[0];
        const res = await request(app)
          .patch(`/album/${album.id}`)
          .send({ name: 'updated name', year: 2022 });

        expect(res.status).to.equal(200);

        const [[newAlbumRecord]] = await db.query(
          'SELECT * FROM Album WHERE id = ?',
          [album.id]
        );

        expect(newAlbumRecord.name).to.equal('updated name');
      });

      it('returns a 404 if the album is not in the database', async () => {
        const res = await request(app)
          .patch('/album/999999')
          .send({ name: 'updated name' });

        expect(res.status).to.equal(404);
      });
    });
  });
});
