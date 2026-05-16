const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const submissions = [];

app.get('/', (req, res) => {
  res.render('index', { submissions });
});

app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const entry = { name, email, message, time: new Date().toLocaleString() };
  submissions.push(entry);

  res.render('result', { entry });
});

app.get('/submissions', (req, res) => {
  res.render('submissions', { submissions });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
