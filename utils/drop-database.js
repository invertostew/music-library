// require the promise version of mysql2
const mysql = require('mysql2/promise');

// require path to handle file paths
const path = require('path');

// extract any command line arguments from argv
const args = process.argv.slice(2)[0];

// use args to determine if .env or .env.test should be loaded
const envFile = args === 'test' ? '../.env.test' : '../.env';

// load environment variables from env files
require('dotenv').config({
  path: path.join(__dirname, envFile),
});

// destructure environment variables from process.env
const {
  DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT,
} = process.env;

// set up connection
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// drop the database
connection.query(`DROP DATABASE ${DB_NAME}`, () => connection.end());
