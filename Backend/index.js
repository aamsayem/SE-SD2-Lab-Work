import express from 'express';
import studentRoutes from './routes/student.route.js';
import authRoutes from './routes/auth.route.js';
import orderRoutes from './routes/order.route.js';
import { checkDBConnection } from "./db.js";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Add a private random value to Backend/.env.");
}

const app = express();
const port = 3000;

app.use(express.json());


app.use("/api/student", studentRoutes);
app.use("/api/students", studentRoutes);

// Authentication Routes
app.use("/api/auth", authRoutes);

// Orders, JOINs, Aggregates, GROUP BY, and HAVING Routes
app.use("/api/orders", orderRoutes);




app.get('/', (req, res) => {
  res.send('Hello World!!');
});

const startServer = async () => {
  await checkDBConnection();
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
};

startServer().catch((err) => {
  console.error("❌ API server could not start:", err.message);
  process.exitCode = 1;
});
