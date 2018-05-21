var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/User");

var {User} = require('./models/user');

var usr = new User({
  email: 'san@mail.com'
});

usr.save().then((doc) => {
  console.log('Saved user', doc);
},(err) => {
  console.log(err);
})
