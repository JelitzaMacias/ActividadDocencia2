const { Client } = require("pg");

const connectionData = {
  user: "postgres",
  host: "localhost",
  database: "db_curso_app",
  password: "1234",
  port: 5432,
};
const client = new Client(connectionData);
client.connect();

module.exports = client;
