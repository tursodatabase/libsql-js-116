import Database from "libsql";

const url = "libsql://libsql-js-bug-giovannibenussi.turso.io";
const token =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgwNDQ1MzksImlkIjoiNTcxMzNhNGEtYjlkNy00NmZjLTk1MmMtMjNlMDRiNWFhZGM3In0.JoxVHWvVkAmT-qQ0xExNtPriQexaCt8c4ZWIhmGXg1ki4gkr6YLjg-ypH2LlwDap48GQPoj9RvxK7ZMTrTE-Cg";

const memoryDatabase = new Database(":memory:");
const remoteDatabase = new Database(url, { authToken: token });
function test(database, name) {
  console.log("===== Testing " + name + " =====");
  database.exec("create table if not exists users (email text primary key);");

  const query = "select email from users;";
  console.log("Running query: " + query);
  const secondStmt = database.prepare(query);
  console.log(
    "reader:" + secondStmt.reader,
    "columns:" + secondStmt.columns().length,
  );
  console.log("");
}

test(memoryDatabase, "Memory Database");
test(remoteDatabase, "Remote Database");
