import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
let server: Server;

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gbp43.mongodb.net/booksDB?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("Connected to MongoDB!");

    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });

    // Optional: Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("SIGINT received. Closing server...");
      await mongoose.disconnect();
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start the server:", (error as Error).message);
    process.exit(1);
  }
}

main();
