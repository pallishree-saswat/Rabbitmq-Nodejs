const express = require("express");
const app = express();
const PORT = 5002;
const amqp = require("amqplib");
var channel, connection;

app.use(express.json())
connect()
async function connect() {
    try {
        const amqpServer = "amqp://localhost:15672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("my-first-queue");
        channel.consume("my-first-queue", data => {
            console.log(`Received data at 5002: ${Buffer.from(data.content)}`);
            channel.ack(data);
        });
    } catch (er) {
        console.error(er);
    }
}

app.listen(PORT, () => {
    console.log("server is up at" + PORT)
})