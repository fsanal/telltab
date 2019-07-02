const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Database = require('./database');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb+srv://admin:UYeKdxqhRrHQDziB@cluster0-gp8ab.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

var forumRoutes = require("./routes/forum_routes");
app.use('/api', forumRoutes);

// append /api for our http requests
//app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

/*
// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Database.Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getFeedback', (req, res) => {
  Database.Feedback.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getGroup', (req, res) => {
  Database.Group.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getComment', (req, res) => {
  Database.Comment.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get('/getCompany', (req, res) => {
  Database.Company.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateData', (req, res) => {
  const { id, message } = req.body;

  Database.Data.findByIdAndUpdate(id, {$set: {message: message}}, {new: true}, (err, model) => {
    if (err) return res.json({ success: false, error: err });
    console.log(model);
    return res.json({ success: true });
  });
});

router.post('/updateFeedback', (req, res) => {
  const { id, content, votes, progress, admin, category, tags,
    priority, visibility, resolved } = req.body;

  Database.Feedback.findByIdAndUpdate(id, {$set: {content: content, votes: votes,
    progress: progress, admin: admin, category: category, tags: tage, priority: priotiy,
    visibility: visibility, resolved: resolved}}, {new: true}, (err, model) => {
    if (err) return res.json({ success: false, error: err });
    console.log(model);
    return res.json({ success: true });
  });
});

router.post('/updateGroup', (req, res) => {
  const { id, name, users } = req.body;

  Database.Group.findByIdAndUpdate(id, {$set: {name: name, users: users}}, {new: true}, (err, model) => {
    if (err) return res.json({ success: false, error: err });
    console.log(model);
    return res.json({ success: true });
  });
});

router.post('/updateComment', (req, res) => {
  const { id, content } = req.body;

  Database.Comment.findByIdAndUpdate(id, {$set: {content: content}}, {new: true}, (err, model) => {
    if (err) return res.json({ success: false, error: err });
    console.log(model);
    return res.json({ success: true });
  });
});

router.post('/updateCompany', (req, res) => {
  const { id, companyName, config, tags } = req.body;

  Database.Company.findByIdAndUpdate(id, {$set: {companyName: companyName, config: config,
    tags: tags}}, {new: true}, (err, model) => {
    if (err) return res.json({ success: false, error: err });
    console.log(model);
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Database.Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteFeedback', (req, res) => {
  const { id } = req.body;
  Database.Feedback.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteGroup', (req, res) => {
  const { id } = req.body;
  Database.Group.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteComment', (req, res) => {
  const { id } = req.body;
  Database.Comment.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.delete('/deleteCompany', (req, res) => {
  const { id } = req.body;
  Database.Company.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Database.Data();

  const { id, message } = req.body;
  console.log(req)

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.message = message;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putFeedback', (req, res) => {
  let data = new Database.Feedback();

  const { content, votes, progress, admin, category, tags,
    priority, visibility, resolved } = req.body;
  console.log(req.body)

  if (!content) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.feedbackId = Database.ObjectId;
  data.content = content;
  data.votes = votes;
  data.progress = progress;
  data.admin = admin;
  data.category = category;
  data.tags = tags;
  data.priority = priority;
  data.visibility = visibility;
  data.resolved = resolved;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putGroup', (req, res) => {
  let data = new Database.Group();

  const { name, users } = req.body;
  console.log(req.body)

  if (!name) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.name = name;
  data.users = users;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putComment', (req, res) => {
  let data = new Database.Comment();

  const { content } = req.body;
  console.log(req.body)

  if (!content) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.content = content;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post('/putCompany', (req, res) => {
  let data = new Database.Company();

  const { companyName, config, tags } = req.body;
  console.log(req.body)

  if (!companyName) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.companyName = companyName;
  data.config = config;
  data.tags = tags;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});
*/
