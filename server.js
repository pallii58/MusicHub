const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Salvataggio temporaneo dei post
let posts = [];

// Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Pagina per creare un nuovo post
app.get('/newpost', (req, res) => {
  res.sendFile(__dirname + '/public/newpost.html');
});

// Creazione del post (invio dal form)
app.post('/create-post', (req, res) => {
  const { title, content } = req.body;

  if (!loggedUser) {
    return res.send('<h1>Devi essere loggato per pubblicare un post.</h1><a href="/login">Vai al login</a>');
  }

  posts.push({
    title,
    content,
    author: loggedUser
  });

  res.redirect('/posts');
});


// Pagina che mostra tutti i post
app.get('/posts', (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Post pubblicati</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>📝 Post pubblicati</h1>
      <a href="/newpost">+ Crea nuovo post</a>
      <div class="post-list">
  `;

  posts.forEach(post => {
    html += `
      <div class="post-card">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      </div>
    `;
  });

  html += `
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

let users = [];
let loggedUser = null;

// Mostra pagina di registrazione
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

// Gestisce registrazione
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  loggedUser = username; // auto-login dopo registrazione
  res.redirect('/newpost');
});

// Mostra pagina di login
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Gestisce login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    loggedUser = username;
    res.redirect('/newpost');
  } else {
    res.send('<h1>Login fallito</h1><a href="/login">Riprova</a>');
  }
});


// Avvio del server
app.get('/curators', (req, res) => {
  res.sendFile(__dirname + '/public/curators.html');
});

app.listen(port, () => {
  console.log(`Forum attivo su http://localhost:${port}`);
});

app.get('/categories', (req, res) => {
  res.sendFile(__dirname + '/public/categories.html');
});


app.get('/rules', (req, res) => {
  res.sendFile(__dirname + '/public/rules.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

app.get('/profile', (req, res) => {
  if (!loggedUser) {
    return res.send('<h1>Devi essere loggato per vedere il profilo.</h1><a href="/login">Login</a>');
  }

  // HTML generato dinamicamente
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Profilo di ${loggedUser}</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>👤 Profilo di ${loggedUser}</h1>
      <p>Benvenuto, ${loggedUser}!</p>
      <p>Qui potrai in futuro gestire i tuoi post, messaggi, impostazioni e collaborazioni.</p>
      <a href="/posts">Vai ai tuoi post</a> | <a href="/newpost">Nuovo post</a>
      <br><br>
      <a href="/">← Torna alla home</a>
    </body>
    </html>
  `;
  res.send(html);
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});


app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log(`Messaggio ricevuto da ${name} (${email}): ${message}`);
  
  res.send(`
    <h1>✅ Messaggio inviato!</h1>
    <p>Grazie ${name}, ti risponderemo presto.</p>
    <a href="/">Torna alla home</a>
  `);
});
