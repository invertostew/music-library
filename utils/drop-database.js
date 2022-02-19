const mysql = require('mysql2');
const path = require('path');

const args = process.argv.slice(2)[0];

const envFile = args === 'test' ? '../.env.test' : '../.env';

require('dotenv').config({
  path: path.join(__dirname, envFile)
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT
});

connection.query(`DROP DATABASE ${DB_NAME}`, () => connection.end());
