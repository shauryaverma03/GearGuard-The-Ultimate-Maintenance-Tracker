import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './routes/api.router';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the API routes
app.use('/api', apiRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});