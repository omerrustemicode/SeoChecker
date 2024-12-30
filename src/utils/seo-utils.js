const cheerio = require('cheerio');
const axios = require('axios');

async function analyzeSEO(url) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  // SEO elements
  const title = $('title').text() || 'No title found';
  const metaDescription = $('meta[name="description"]').attr('content') || 'No description found';
  const keywords = $('meta[name="keywords"]').attr('content') || 'No keywords found';
  const viewport = $('meta[name="viewport"]').attr('content') || 'No viewport meta tag found';

  // Image alt tags
  const images = [];
  $('img').each((i, img) => {
    images.push({
      src: $(img).attr('src'),
      alt: $(img).attr('alt') || 'Missing alt attribute',
    });
  });

  // Links and broken links
  const links = [];
  const brokenLinks = [];
  $('a').each(async (i, link) => {
    const href = $(link).attr('href');
    links.push(href);
    try {
      if (href && href.startsWith('http')) await axios.get(href);
    } catch (error) {
      brokenLinks.push(href);
    }
  });

  // Scoring
  let score = 0;
  const totalPoints = 6;
  const suggestions = [];

  if (title.length >= 30 && title.length <= 60) score++;
  else suggestions.push('Title should be between 30 and 60 characters.');

  if (metaDescription.length >= 50 && metaDescription.length <= 160) score++;
  else suggestions.push('Meta description should be between 50 and 160 characters.');

  if (keywords) score++;
  else suggestions.push('Consider adding meta keywords.');

  if (viewport.includes('width=device-width')) score++;
  else suggestions.push('Add a viewport meta tag for mobile responsiveness.');

  if (images.every((img) => img.alt !== 'Missing alt attribute')) score++;
  else suggestions.push('Add alt attributes to all images.');

  if (brokenLinks.length === 0) score++;
  else suggestions.push('Fix broken links.');

  const seoPercentage = Math.round((score / totalPoints) * 100);

  return {
    title,
    metaDescription,
    keywords,
    viewport,
    images,
    links,
    brokenLinks,
    suggestions,
    seoPercentage,
  };
}

module.exports = { analyzeSEO };
