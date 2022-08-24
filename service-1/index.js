const express = require("express");
const app = express();
const PORT = 5001;
const amqp = require("amqplib");
var channel, connection;

app.use(express.json())
connect()

//connect to rabbitmq server
async function connect() {
    try {

        const amqpServer = "amqp://localhost:5672"
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel()
        await channel.assertQueue("my-first-queue") // if there is no queue named "my-first-queue" it will create otherwise insert to that queue

    } catch (error) {
        console.log(error)
    }
}

const createSession = async user => {
    await channel.sendToQueue("session", Buffer.from(JSON.stringify(user)));
    await channel.close();
    await connection.close();
};

app.post("/login", (req, res) => {
    const { user } = req.body;
    createSession(user);
    res.send(user);
});
app.get("send", async(req, res) => {
    const data = {
        order: "Order 1",
        qt: "2"
    }
    await channel.sendToQueue("my-first-queue", Buffer.from(data))
    await channel.close()
    await connection.close()
    res.send("data has sent to my-first-queue")
})

app.listen(PORT, () => {
    console.log("server is up at" + PORT)
})