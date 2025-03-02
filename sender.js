#!/usr/bin/env node
const amqp = require('amqplib/callback_api')

// Create connection
amqp.connect('amqp://user:password@rabbitmq-dev.vnlp.ai/quan-dev', (err, conn) => {
  // Create channel
  conn.createChannel((err, ch) => {
    // Name of the queue
    const q = 'task_queue_durable'
    // Write a message
    const msg = process.argv.slice(2).join(' ') || "Hello World!"
    const newOptions = {
      durable: true,
      exchangeType: 'direct',
    }
    ch.assertExchange(q, 'direct', {
      durable: newOptions.durable,
      arguments: {
        'x-message-ttl': 15000,
      },
    });

    // Declare the queue
    // ch.assertQueue(q, { durable: true }) // { durable: true } ensures that the message will still be redelivered even if RabbitMQ service is turned off/restarted

    // Send message to the queue

    for (let i = 0; i < 200; i++) {
      ch.sendToQueue(q, new Buffer(`${msg} ${i}`), { persistent: true }) // {persistent: true} saves the message to disk/cache
      console.log(` {x} Sent '${msg}' ${i}`)
    }

    // Close the connection and exit
    // setTimeout(() => {
    //   conn.close()
    //   process.exit(0)
    // }, 500)
  })
})