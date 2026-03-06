const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const databaseDir = path.join(__dirname, '..', 'database');
const databasePath = path.join(databaseDir, 'asalna.db');
const schemaPath = path.join(databaseDir, 'schema.sql');
const seedPath = path.join(databaseDir, 'seed.sql');

fs.mkdirSync(databaseDir, { recursive: true });
if (!fs.existsSync(databasePath)) {
  fs.closeSync(fs.openSync(databasePath, 'w'));
}

const db = new sqlite3.Database(databasePath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) reject(error);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) reject(error);
      else resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
}

async function initialize() {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const seed = fs.readFileSync(seedPath, 'utf8');
  await run('PRAGMA foreign_keys = ON');
  await new Promise((resolve, reject) => {
    db.exec(schema, (error) => (error ? reject(error) : resolve()));
  });
  await new Promise((resolve, reject) => {
    db.exec(seed, (error) => (error ? reject(error) : resolve()));
  });
}

module.exports = {
  db,
  run,
  get,
  all,
  initialize,
  databasePath
};
