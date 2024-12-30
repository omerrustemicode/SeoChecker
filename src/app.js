const express = require('express');
const path = require('path');
const seoRoutes = require('./routes/seo');
require('dotenv').config();

const app = express();

// Set view engine and public directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'SEO Analyzer', error: null });
});

app.use('/seo', seoRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
