const Mongoose = require("mongoose");

let uri = "mongodb://localhost/the_supers_prod";

Mongoose.connect(uri, { useNewUrlParser: true });

Mongoose.connection.on("connected", () => {
    console.log("============================");
    console.log("============================");
    console.log(`Connected to the uri ${uri}`);
    console.log("============================");
    console.log("============================");
});

Mongoose.connection.on("error", (err) => {
    console.log(`mongoose connection has some error ${err}`);
});

Mongoose.connection.on("diconnected", () => {
    console.log("MOngoose disconnected");
});

const shutdown = (msg, callback) => {
    Mongoose.connection.close(() => {
        console.log(`mongoose disconnected through ${msg}`);
        callback();
    });
};

process.once("SIGUSR2", () => {
    shutdown("nodemon restart", () => {
        process.kill(process.pid, "SIGUSR2");
    });
});

process.on("SIGINT", () => {
    shutdown("app termination", () => {
        process.exit(0);
    });
});

process.on("SIGTERM", () => {
    shutdown("Hereko app shutdown", () => {
        process.exit(0);
    });
});

require("./heros");