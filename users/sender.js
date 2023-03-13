const amqp = require("amqplib");

exports.connectToQ = async function(data) {
  // Connect to RabbitMQ server
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // Declare queue for users
  const userQueue = "users";
  await channel.assertQueue(userQueue);

  console.log("////////////", data);

  // Publish added user to orders server
  channel.sendToQueue(userQueue, Buffer.from(JSON.stringify(data)));
};