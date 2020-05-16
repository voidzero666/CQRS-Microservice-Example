const Example = require('../models/example.model');
const MQService = require('../utils/MQService.utils');

const exampleCreate = (req, res, next) => {
  const exampleNew = new Example({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
  });

  exampleNew.save(async (err) => {
    if (err) return next(err);

    await MQService.sendMessage(
      'example',
      JSON.stringify({ eventType: 'createResource', example: exampleNew })
    );
    return res.status(200).json(exampleNew).end();
  });
};

const exampleUpdate = async (req, res, next) => {
  Example.findByIdAndUpdate(req.params.id, { $set: req.body }, async (err) => {
    if (err) return next(err);

    await MQService.sendMessage(
      'example',
      JSON.stringify({
        eventType: 'updateResource',
        customer: { _id: req.params.id, ...req.body },
      })
    );
    return res
      .status(200)
      .json({ _id: req.params.id, ...req.body })
      .end();
  });
};

const exampleDelete = (req, res, next) => {
  Example.findByIdAndRemove(req.params.id, async (err, example) => {
    if (err) return next(err);
    await MQService.sendMessage(
      'example',
      JSON.stringify({ eventType: 'deleteResource', customer })
    );
    return res.status(200).json('example removed.').end();
  });
};

module.exports = {
  exampleCreate,
  exampleUpdate,
  exampleDelete,
};
