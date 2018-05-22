var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
  localhost: 'mongodb://localhost:27017/TodoAp',
  mlab: 'mongodb://test_user:test123@ds139761.mlab.com:39761/todoapp'
}
mongoose.connect(db.mlab || db.localhost);

module.exports = { mongoose }
