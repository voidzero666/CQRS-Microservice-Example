/* eslint-disable no-underscore-dangle */
const ExampleRead = require('../models/exampleRead.model');

const exampleCreate = (example) => {
  const exampleNew = new ExampleRead(example);

  exampleNew.save((err) => {
    if (err) console.error(err);
  });
};

const exampleUpdate = (example) => {
  ExampleRead.findByIdAndUpdate(example._id, { $set: example }, (err) => {
    if (err) console.error(err);
  });
};

const exampleDelete = (example) => {
  ExampleRead.findByIdAndRemove(example._id, (err) => {
    if (err) console.error(err);
  });
};

module.exports = {
  exampleCreate,
  exampleUpdate,
  exampleDelete,
};
