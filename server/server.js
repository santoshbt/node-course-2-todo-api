var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');

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


  // findById
    // success
      // if todo - send it back
      // if no todo - send back 404 with empty body
    // error
      // 400 - and send empty body back
});

app.listen(3000, () => {
  console.log(`Started on port ${port}`);
})


module.exports = {app};
