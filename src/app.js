import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './db/connection.js';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

try {
  connectDB();
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Blog API is running'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

app.use(errorHandler);

try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (error) {
  console.error('Error starting server:', error);
}

export default app;
