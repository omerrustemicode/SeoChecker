const express = require('express');
const { analyzeSEO } = require('../utils/seo-utils');

const router = express.Router();

router.get('/', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.render('index', { title: 'SEO Analyzer', error: 'Please provide a valid URL.' });
  }

  try {
    const results = await analyzeSEO(url);
    res.render('seo', { url, ...results });
  } catch (error) {
    res.render('index', { title: 'SEO Analyzer', error: 'Error fetching the URL. Please try again.' });
  }
});

module.exports = router;
