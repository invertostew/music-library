const { expect } = require('chai');
const request = require('supertest');

const getDb = require('../src/services/db');
const app = require('../src/app');

describe('create artist', () => {
  let db;
  beforeEach(async () => (db = await getDb()));

  afterEach(async () => {
    await db.query('DELETE FROM artists');
    await db.close();
  });

  describe('/artists', () => {
    describe('POST', () => {
      it('creates a new artist in the database', async () => {
        const res = await request(app).post('/artists').send({
          name: 'Tame Impala',
          genre: 'rock'
        });

        const [[artistEntries]] = await db.query(
          "SELECT * FROM artists WHERE name = 'Tame Impala'"
        );

        expect(res.status).to.equal(201);
        expect(artistEntries.name).to.equal('Tame Impala');
        expect(artistEntries.genre).to.equal('rock');
      });
    });
  });
});
