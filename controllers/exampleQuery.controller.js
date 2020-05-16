const ExampleRead = require('../models/exampleRead.model');

const exampleRead = (req, res, next) => {
  ExampleRead.findById(req.params.id, (err, example) => {
    if (err) return next(err);
    return res.status(200).json(example).end();
  });
};

const exampleGetAll = (req, res, next) => {
  ExampleRead.find((err, examples) => {
    if (err) return next(err);
    return res.status(200).json(examples).end();
  });
};

module.exports = {
  exampleRead,
  exampleGetAll,
};
