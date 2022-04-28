const redis = require("redis");

let port = 6379;
let host = "127.0.0.1";
const client = redis.createClient({
  socket: { port: port, host: host },
});

//const client = redis.createClient({ host:host, port: 6379 });


(async () => {
  await client.connect();
})();

client.on("connect", () => {
  console.log("Connected to Redis Server");
});

client.on("error", (err) => {
  console.log(`Error:${err}`);
});

module.exports = client;