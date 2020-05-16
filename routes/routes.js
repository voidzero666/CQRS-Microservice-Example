const router = require('express').Router();
const exampleCommandController = require('../controllers/exampleCommand.controller');
const exampleQueryController = require('../controllers/exampleQuery.controller');

// command
router.post('/', exampleCommandController.customerCreate);
router.put('/:id', exampleCommandController.customerUpdate);
router.delete('/:id', exampleCommandController.customerDelete);

// query
router.get('/:id', exampleQueryController.customerRead);
router.get('/', exampleQueryController.customerGetAll);

router.use('*', (req, res) =>
  res.status(404).json({ message: 'Endpoint Not found' }).end()
);

module.exports = router;
