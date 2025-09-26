import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './startup/app.js';

dotenv.config();

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, async () => {
  await connectDB();
  console.log(`The app is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
