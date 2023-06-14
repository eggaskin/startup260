const express = require('express');
const app = express();
const db = require('./database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const { peerProxy } = require('./peerProxy.js');


// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/note`, apiRouter);

// login 
apiRouter.post('/login', async (req, res) => {
  const user = await db.getUser(req.body.uname);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// create user
apiRouter.post('/createuser', async (req, res) => {
  if (await db.getUser(req.body.uname)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const tok = await db.createUser(req.body.uname, req.body.password);
    setCookie(res, tok);
    res.send({
      token: tok,
    });
  }
});


//TODO: fix db stuff
// apiRouter.get('/me', async (req, res) => {
//   authToken = req.cookies['token'];
//   const user = await collection.findOne({ token: authToken });
//   if (user) {
//     res.send({ email: user.email });
//     return;
//   }
//   res.status(401).send({ msg: 'Unauthorized' });
// });

function setCookie(res, tok) {
  res.cookie('token', tok, {secure:true, httpOnly:true, sameSite:'strict'}); 
}

// GetCategories
apiRouter.get('/cats', async (_req, res) => {
  const authToken = _req.cookies['token'];
  const cats = await db.getCategories(authToken);
  if (cats == null) {
    res.status(401).send({ msg: 'Please login!' });
    return;
  }
  delete cats.username;
  delete cats.token;
  delete cats.password;
  delete cats._id;
  // console.log(cats); TODO:
  res.send(cats);
});

// GetCategory NOT UPDATED
apiRouter.get('/cat/:catname', async (req, res) => {
  const catname = req.params.catname;
  const cat = await db.getCategory(catname);
  res.send(cat);
});

// submit categories
apiRouter.post('/savecats', async (req, res) => {
  const authToken = req.cookies['token'];
  //cats = JSON.stringify(req.body);
  const result = await db.subCategories(authToken, req.body);
  if (result == null) {
    res.status(401).send({ msg: 'Please login to save your work!' });
    return;
  }
  const cats = await db.getCategories(authToken);
  delete cats.username;
  delete cats.token;
  delete cats.password;
  delete cats._id;
  console.log(cats);
  res.send(cats);
});

// submit category NOT UPDATED
apiRouter.post('/savecat/', async (req, res) => {
  // const catname = req.params.catname;
  db.addCategory(req.body);
  const cats = await db.getCategories();
  console.log(cats[0]);
  res.send(cats[0]);
});

// update category NOT UPDATED
apiRouter.post('/savecat/:catname', async (req, res) => {
  const catname = req.params.catname;
  db.updateCategory(catname, req.body);
  const cats = await db.getCategories();
  console.log(cats[0]);
  res.send(cats[0]);
});

app.use(function (err, req, res, next) { // error handling middleware
  res.status(500).send({ type: err.name, message: err.message });
});
// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const serv = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(serv);
