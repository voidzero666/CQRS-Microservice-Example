const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

console.log(`MongoURL (example): ${process.env.MONGO_URL}`);

// eslint-disable-next-line no-multi-assign
const app = (module.exports = express());
const port = 8080;

require('./utils/database.utils');
require('./utils/MQEventListener.utils');

app.use(bodyParser.json({ extended: true }));

app.use('/api', routes);

// Listen on port
app.listen(port, () => {
  console.log(`Express: Port ${port}`);
});
