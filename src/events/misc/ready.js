

const { connect, connection, mongoose } = require('mongoose');
mongoose.set('strictQuery', false);
module.exports = (client) => {
    // Db Connect
    if(process.env.DB === "") return console.log("No db provided")
    connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const dbStatus = connection;

    dbStatus.on("connected", () => console.log("Connected to the database!"))

    // Set status on start
    client.user.setPresence({
        status: "online"
    })
}