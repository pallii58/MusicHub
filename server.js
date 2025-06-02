const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Route fissa: solo homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Qualsiasi altra route → 404
app.use((req, res) => {
  res.status(404).send('404 - Pagina non trovata');
});

// Avvio del server
app.listen(port, () => {
  console.log(`✅ Homepage disponibile su http://localhost:${port}`);
});
