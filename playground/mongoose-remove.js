const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {
  console.log(result);
});

// Todo.findOneAndRemove()
// Todo.finByIdAndRemove()

Todo.findOneAndRemove({_id: '5b0574e9d1fba845d805f5da'}).then((todo) => {

});

Todo.findByIdAndRemove('5b0574e9d1fba845d805f5da').then((todo) => {
  console.log(todo);
});
