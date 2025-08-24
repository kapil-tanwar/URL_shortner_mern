import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener',
  NODE_ENV: process.env.NODE_ENV || 'development',
  VERCEL_URL: process.env.VERCEL_URL || null
};
