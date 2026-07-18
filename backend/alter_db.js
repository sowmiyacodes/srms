const { Client } = require('pg');
require('dotenv').config();

async function run() {
  console.log("Connecting to:", process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected successfully!");

    // Check if column exists
    const res = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='student' AND column_name='photo';
    `);

    if (res.rows.length === 0) {
      console.log("Column 'photo' is missing. Adding it now...");
      await client.query(`ALTER TABLE student ADD COLUMN photo TEXT;`);
      console.log("Column 'photo' added successfully!");
    } else {
      console.log("Column 'photo' already exists.");
    }
  } catch (err) {
    console.error("Error modifying database:", err);
  } finally {
    await client.end();
  }
}

run();
