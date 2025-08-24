import express from 'express';
import { createShortUrl, getAllUrls } from '../controllers/url.controller.js';

const router = express.Router();

router.post('/shorten', createShortUrl);
router.get('/admin', getAllUrls);

export default router;
