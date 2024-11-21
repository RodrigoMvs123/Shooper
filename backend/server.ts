import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rideRoutes from './routes/rideRoutes';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use('/ride', rideRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});