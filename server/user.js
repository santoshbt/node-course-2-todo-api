var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/User");

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  }
});

var usr = new User({
  email: 'san@mail.com'
});

usr.save().then((doc) => {
  console.log('Saved user', doc);
},(err) => {
  console.log(err);
})
