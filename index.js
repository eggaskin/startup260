const express = require('express');
const app = express();
const db = require('./database.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/note`, apiRouter);

// GetCategories
apiRouter.get('/cats', (_req, res) => {
  // res.send(cats);
  const cats = await db.getCategories();
  res.send(cats);
});

// GetCategory
apiRouter.get('/cat/:catname', (req, res) => {
  const catname = req.params.catname;
  const cat = await db.getCategory(catname);
  res.send(cat);
});

// submit categories
apiRouter.post('/savecat', (req, res) => {
  cats = JSON.stringify(req.body);
  // console.log(cats);
  res.send(cats);
});

// submit category
apiRouter.post('/savecat/:catname', (req, res) => {
  const catname = req.params.catname;
  db.addCategory(catname);
  // TODO: res.send(catname);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
