const mongoose = require('mongoose');

const connection = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(connection, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Error Handling
mongoose.connection.on(
  'error',
  console.error.bind(console, `Could not connect to ${connection}`)
);

// Successful connection
mongoose.connection.once('open', () => {
  console.log(`Connected to mongodb: ${connection}`);
});
