const amqp = require('amqplib/callback_api');

const {
  exampleCreate,
  exampleUpdate,
  exampleDelete,
} = require('../controllers/exampleDenormalizer.controller');

const { MQ_URL } = process.env;
const queue = 'example';

amqp.connect(MQ_URL, (connectionError, connection) => {
  if (connectionError) throw connectionError;

  // Idempotent: Only creates the channel when it doesn't exist
  connection.createChannel((channelError, channel) => {
    if (channelError) throw channelError;
    console.dir(`Connected to RabbitMQ`);

    channel.assertQueue(queue, { durable: false });

    // Subscribe to the channel
    channel.consume(
      queue,
      (message) => {
        try {
          const { eventType, example } = JSON.parse(
            message.content.toString()
          );

          switch (eventType) {
            case 'createResource':
              exampleCreate(example);
              break;
            case 'updateResource':
              exampleUpdate(example);
              break;
            case 'deleteResource':
              exampleDelete(example);
              break;
            default:
              console.warning('Event Type Unknown');
              break;
          }
        } catch (notJsonException) {
          console.log(notJsonException);
        }
      },
      { noAck: true }
    );
  });
});
