import app from "./app.js";
import env from "./config/env.js";
import { connectDb } from "./config/db.js";

const startServer = () => {
  const server = app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });

  server.on("error", (error) => {
    console.error("Server error:", error);
  });
};

const bootstrap = async () => {
  await connectDb();
  startServer();
};

bootstrap();
