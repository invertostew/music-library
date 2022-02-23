const mysql = require('mysql2');
const path = require('path');

const args = process.argv.slice(2)[0];

// const envFile = args === 'test' ? '../.env.test' : '../.env';

require('dotenv').config({
  path: path.join(__dirname, '../.env.test')
});

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME
});

connection.query(`DROP DATABASE ${DB_NAME}`, () => connection.end());
