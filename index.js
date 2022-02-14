const app = require('./src/app');

const APP_PORT = process.env.PORT || 4000;

app.listen(APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on http://localhost:${APP_PORT}/`);
});
