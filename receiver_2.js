#!/usr/bin/env node
const amqp = require('amqplib/callback_api')
const axios = require('axios');
const { getSampleCdr } = require('./cdr-helper');

// Create connection
amqp.connect('amqp://user:password@rabbitmq-staging.vnlp.ai/quan-dev', (err, conn) => {
  // Create channel
  conn.createChannel((err, ch) => {
    // Name of the queue
    const q = 'handle_outbound_call';
    // Declare the queue
    ch.assertQueue(q, { durable: true }) // { durable: true } ensures that the message will still be redelivered even if RabbitMQ service is turned off/restarted
    // Tell RabbitMQ not to give more than 1 message per worker
    ch.prefetch(30)
    let call= 0;
    // Wait for Queue Messages
    console.log(` [*] Waiting for messages in ${q}. To exit press CTRL+C`);
    const responses = [5000, 30000, 50000, 14000, 20000, 20000, 30000];
    const finishQueue = setupFinishCallQueue(ch);
    ch.consume(q, async msg => {
      // Fake task which simulates execution time
      const date = new Date();
      await timeout(responses[Math.round(Math.random() * 10)]);
      console.log(`call done! ${call}`);
      call++;

      const body = {
        ...JSON.parse(msg.content), cdr: {
          ...JSON.parse(msg.content),
          ...getSampleCdr(date),
          endedAt: new Date(),
        },
      };
      ch.sendToQueue(finishQueue, Buffer.from(JSON.stringify(body)));
      ch.ack(msg);
    }, { noAck: false } // noAck: false means Message acknowledgments is turned on
    )
  })
})

function setupFinishCallQueue(ch) {
  const q = 'finish_call';
  ch.assertQueue(q, { durable: true }) // { durable: true } ensures that the message will still be redelivered even if RabbitMQ service is turned off/restarted
  return q;
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}