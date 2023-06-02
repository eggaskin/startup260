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
apiRouter.get('/cats', async (_req, res) => {
  // res.send(cats);
  const cats = await db.getCategories();
  // console.log(cats);
  console.log(cats[0]);
  res.send(cats[0]);
});

// GetCategory
apiRouter.get('/cat/:catname', async (req, res) => {
  const catname = req.params.catname;
  const cat = await db.getCategory(catname);
  res.send(cat);
});

// submit categories
apiRouter.post('/savecats', async (req, res) => {
  //cats = JSON.stringify(req.body);
  db.subCategories(req.body);
  const cats = await db.getCategories();
  console.log(cats[0]);
  res.send(cats[0]);
});

// submit category
apiRouter.post('/savecat/', async (req, res) => {
  // const catname = req.params.catname;
  db.addCategory(req.body);
  const cats = await db.getCategories();
  console.log(cats[0]);
  res.send(cats[0]);
});

// update category
apiRouter.post('/savecat/:catname', async (req, res) => {
  const catname = req.params.catname;
  db.updateCategory(catname, req.body);
  const cats = await db.getCategories();
  console.log(cats[0]);
  res.send(cats[0]);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
