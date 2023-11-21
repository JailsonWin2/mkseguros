import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function conectaNaDatabase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "1",
      j: true,
      wtimeout: 1000,
    },
  });

  return mongoose.connection;
}

export default conectaNaDatabase;
