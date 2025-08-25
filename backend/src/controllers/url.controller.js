import Url from '../models/url.model.js';
import { nanoid } from 'nanoid';
import config from '../config/env.js';

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    let url = await Url.findOne({ originalUrl });
    
    if (url) {
      const publicHost = config.RENDER_EXTERNAL_URL || config.VERCEL_URL;
      const baseUrl = publicHost
        ? `${publicHost.startsWith('http') ? '' : 'https://'}${publicHost}`
        : `${req.protocol}://${req.get('host')}`;
      return res.json({
        originalUrl: url.originalUrl,
        shortUrl: `${baseUrl}/${url.shortCode}`,
        shortCode: url.shortCode
      });
    }

    const shortCode = nanoid(6);
    
    url = new Url({
      originalUrl,
      shortCode
    });

    await url.save();

    const publicHost = config.RENDER_EXTERNAL_URL || config.VERCEL_URL;
    const baseUrl = publicHost
      ? `${publicHost.startsWith('http') ? '' : 'https://'}${publicHost}`
      : `${req.protocol}://${req.get('host')}`;
    res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${baseUrl}/${url.shortCode}`,
      shortCode: url.shortCode
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export {
  createShortUrl,
  getAllUrls
};
