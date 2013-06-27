var express, app;
express = require('express');
app = module.exports = express();
app.get('/', function(req, res){
  if (!req.session.userId) {
    res.send('null');
    return;
  }
  req.getUser(function(user){
    res.send(JSON.stringify({
      username: user.username,
      admin: user.admin
    }));
  });
});
app.post('/', function(req, res){
  var params, ref$;
  params = {
    username: (ref$ = req.body.params).username,
    password: ref$.password
  };
  req.models.user.find(params, function(err, users){
    res.send(JSON.stringify(users.length ? (req.session.userId = users[0].id, users[0]) : null));
  });
});
app.del('/', function(req, res){
  if (!req.session.userId) {
    return;
  }
  delete req.session.userId;
  res.send(200);
});