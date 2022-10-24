#!/usr/bin/env node
const amqp = require('amqplib/callback_api')
const axios = require('axios');
const { getSampleCdr } = require('./cdr-helper');

// Create connection
amqp.connect('amqp://localhost', (err, conn) => {
  // Create channel
  conn.createChannel((err, ch) => {
    // Name of the queue
    const q = 'handleOutboundCall';
    // Declare the queue
    ch.assertQueue(q, { durable: true }) // { durable: true } ensures that the message will still be redelivered even if RabbitMQ service is turned off/restarted
    // Tell RabbitMQ not to give more than 1 message per worker
    ch.prefetch(30)

    // Wait for Queue Messages
    console.log(` [*] Waiting for messages in ${q}. To exit press CTRL+C`);
    const responses = [500, 5000, 30000, 500, 500, 6000, 50000, 20000];
    let call = 0;
    ch.consume(q, async msg => {
      // Fake task which simulates execution time
      const date = new Date();
      await timeout(responses[Math.round(Math.random() * 10)]);
      console.log(`call done! ${call}`);
      call++;
      const url = 'http://localhost:4010/api/v1/outbound-calls/call-end';

      const body = {
        ...JSON.parse(msg.content), cdr: {
          ...JSON.parse(msg.content),
          ...getSampleCdr(date),
        },
      };
      await axios.put(url, body);
      ch.ack(msg);
    }, { noAck: false } // noAck: false means Message acknowledgments is turned on
    )
  })
})

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}