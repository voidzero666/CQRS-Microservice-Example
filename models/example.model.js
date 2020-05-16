const mongoose = require('mongoose');

const { Schema } = mongoose;

const exampleSchema = new Schema({
  name: { type: String, required: true, max: 150 },
  email: { type: String, required: true, max: 150 },
  description: { type: String, required: true },
});

// Export the model
module.exports = mongoose.model('example', exampleSchema);
