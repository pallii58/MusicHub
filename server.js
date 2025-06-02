const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

// Servi i file statici dalla cartella "public"
app.use(express.static('public'));

// Avvio server
app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});
