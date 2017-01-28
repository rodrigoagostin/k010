const Friends = require('./controllers/friends');

module.exports = function(app) {

  app.get('/', Friends.getList);
  app.post('/', Friends.save);
  app.put('/:id', Friends.updateFriend);
  app.delete('/:id', Friends.deleteFriend);
  app.post('/bingo', Friends.bingo);
  app.post('/restart', Friends.restart);

}
