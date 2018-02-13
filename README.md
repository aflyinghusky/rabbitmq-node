# RabbitMQ for Node.js
This is a simple guide to create a RabbitMQ consumer/producer in MacOS using Node.js. This covers installation and execution of RabbitMQ service.

## 1. Install RabbitMQ
- https://www.rabbitmq.com/install-homebrew.html

- `brew install rabbitmq`

## 2. Mac OS Brew install issues

### Problem
```
Error: The `brew link` step did not complete successfully
The formula built, but is not symlinked into /usr/local
Could not symlink sbin/cuttlefish
/usr/local/sbin is not writable.
```

### Solution
```
cd /usr/local
sudo mkdir sbin
sudo chown -R glenn:admin sbin
brew link rabbitmq
```

## 3. Start RabbitMQ Service
- `brew services start rabbitmq`

## 4. Run `send.js`
```
./send.js
```

## 5. Run `receive.js`
```
./receive.js
```

## 6. Listing Queues
```
/usr/local/sbin/rabbitmqctl list_queues
```