const amqp = require('amqplib/callback_api');

let channel = null;

amqp.connect(process.env.MQ_URL, (error, connection) => {
  connection.createChannel((err, createdChannel) => {
    if (err) console.error(err);
    channel = createdChannel;
  });
});

const sendMessage = async (queueName, data) => {
  channel.sendToQueue(queueName, Buffer.from(data));
};

process.on('exit', (code) => {
  console.log(code);
  channel.close();
});

module.exports = { sendMessage };
