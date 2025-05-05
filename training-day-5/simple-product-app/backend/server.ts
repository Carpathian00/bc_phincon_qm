// Database
import db from './models/index.js';

// server.ts
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Import routes
import appRouter from './routes/router.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

// Routes
app.use(appRouter);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Simple Product App API' });
});

// Sync database and start server
db.sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every restart
  .then(() => {
    console.log("Database synced");
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to sync database:", err);
  });