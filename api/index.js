//TODO: Adjust to mongoDB:

const server = require('./src/app.js');
// const { conn } = require('./src/DB/db.js');

// conn.sync(/* { force: false } */).then(() => {
server.listen(process.env.PORT, () => {
  console.log('%s listening');
});
// });
