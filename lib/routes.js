module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index')
  });

  app.get('/posts', function(req, res) {
    if(req.session.user) {
      req.models.Post.find(function(err, posts) {
        if(err)
          res.send(err);
        else  {
          res.json(posts);
        }
      });
    }
    else
        res.end();
  });

  app.post('/posts', function(req, res) {
    if(req.session.user) {
      new req.models.Post({body: req.body.post}).save(function(err, data) {
        if(err)
          res.send(err);
        else 
          res.json(data);
      });
    }
  });

  app.delete('/posts', function(req, res) {
    console.log(req.body.id);
    req.models.Post.findByIdAndRemove(req.body.id, function(err, doc) {
      if(err)
        res.send(err);
      else
        res.end('correct');
    });
  });

  app.post('/users', function(req, res) {
    new req.models.User({username: req.body.username,
      full_name: req.body.fullname, email: req.body.email,
      password: req.body.password}).save(function(err, user) {
        if(err) return res.send(req.models.User.humanMessages(err));
        else {
          req.session.user = user;
          res.send('correct', {result: 'correct', message: "Logged in as " + user.username});
        }
    });
  });

  app.post('/sessions', function(req, res, next) {
    if(!req.body.email || !req.body.password) {
      return res.send({result: 'fail', message: ['Please enter both a password and an email account']});
    }
    else {
      req.models.User.findOne({
        email: req.body.email}, function(err, user) {
          if(err) {
            return res.send(err);
          }
          else if(user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
              if(err) return next(err);

              else if(!isMatch) {
                return res.send({result: 'fail', message: ['Password is incorrect']});
              }
              else {
                req.session.user = user;
                return res.send({result: 'correct', message: "Logged in as " + user.username});
              }
            });
          }
          else
            res.send({result: "fail", message: ["User doesn't exist"]});
        });
    }
  });

  app.delete('/sessions', function(req, res) {
    delete req.session.user;
    res.end('correct');
  });
};