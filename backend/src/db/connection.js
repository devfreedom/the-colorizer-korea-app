import mongoose from "mongoose";

const path = require('path');
const envPath = path.resolve(__dirname, '../../config/.env/credentials.env')
require('dotenv').config({ path: envPath });

function dbConnection() {
  
  /*
  const URL =
    process.env.MONGODB_URI || 
    `null (connection string is missing)`;
  */

  // Local development for now
  const URL = "mongodb://localhost:27017"

  mongoose.connect(URL);
  const db = mongoose.connection;

  db.on("connected", () =>
    console.log(`Successfully connected to MongoDB.`)
  );

  db.on("error", (error) =>
    console.log(`Couldn't connect to MongoDB database.\nError: ${error}`)
  );
}

export { dbConnection };
