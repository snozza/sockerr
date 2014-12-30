module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index')
  });

  app.get('/posts', function(req, res) {
    req.models.Post.find(function(err, posts) {
      if(err)
        res.send(err);

      res.json(posts);
    });
  });

  app.post('/posts', function(req, res) {
    new req.models.Post({body: req.body.post}).save(function(err, data) {
      if(err)
        res.send(err);
      res.json(data)
    });
  });
};