require('./config/config.js');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var obj = new ObjectID();

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos })
  }, (e) => {
    res.status(400).send(e);
  })
});

// GET todos/12345
app.get('/todos/:id', (req,  res) => {
  var id = req.params.id;

  // Validate id using isValid
  if(!ObjectID.isValid(id)){
    // 404 - send back empty body
    return res.status(404).send();
  }else{
    var todo = Todo.findById(id).then((todo) => {
      if(!todo){
        return res.status(404).send();
      }
      return res.send({todo});
    }, (e) => {
      return res.status(400).send();
    });
  }
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  console.log(req.body);
  var body = _.pick(req.body, ['text', 'completed']);
  console.log(body);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body)
  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.listen(3000, () => {
  console.log(`Started on port ${port}`);
})


module.exports = {app};
