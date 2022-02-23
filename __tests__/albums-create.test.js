const { expect } = require('chai');
const request = require('supertest');

const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create artist', () => {
  let db;
  let artist;
  beforeEach(async () => {
    db = await getDb();

    await db.query('INSERT INTO artists (name, genre) VALUES(?, ?)', [
      'Tame Impala',
      'rock'
    ]);

    [[artist]] = await db.query('SELECT * FROM artists');
  });

  afterEach(async () => {
    await db.query('DELETE FROM albums');
    await db.query('DELETE FROM artists');
    await db.close();
  });

  describe('/artists/:artistId/albums', () => {
    describe('POST', () => {
      it('creates a new album in the database', async () => {
        const artistId = artist.id;
        const res = await request(app)
          .post(`/artists/${artistId}/albums`)
          .send({
            name: 'Currents',
            year: 2015,
            artistId
          });

        const [[albumEntries]] = await db.query(
          "SELECT * FROM albums WHERE name = 'Currents'"
        );

        expect(res.status).to.equal(201);
        expect(albumEntries.name).to.equal('Currents');
        expect(albumEntries.year).to.equal(2015);
      });
    });
  });
});
