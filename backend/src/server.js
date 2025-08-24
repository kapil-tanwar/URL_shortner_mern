import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import urlRoutes from './routes/url.routes.js';
import config from './config/env.js';
import Url from './models/url.model.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', urlRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API' });
});

app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
