import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import courseRoutes from './routes/course.routes';
import bodyParser from 'body-parser';


dotenv.config();
connectDB();

const app = express();
const cors = require('cors');
app.use(cors({
  credintial: true,
  origin: 'https://noorassign.netlify.app/'
}));
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Course Catalog API');
  });
app.use('/api', courseRoutes);



export default app;
