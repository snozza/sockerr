module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index')
  });

  app.get('/posts', function(req, res) {
    if(req.session.user) {
      req.models.Post.find({username: req.session.user.username}, function(err, data) {        
        if(err)
          res.send(err);
        else  {
          res.json(data);
        }
      });
    }
    else
        res.end();
  });

  app.get('/allposts', function(req, res) {
    if(req.session.user) {
      req.models.Post.find(function(err, data) {        
        if(err)
          res.send(err);
        else  {
          res.json(data);
        }
      });
    }
    else
        res.end();
  });

  app.post('/posts', function(req, res) {
    if(req.session.user) {
      var full_name = req.session.user.full_name;
      var username = req.session.user.username;
      new req.models.Post({body: req.body.post, full_name: full_name,
        username: username}).save(function(err, data) {
        if(err)
          res.send(err);
        else {
          res.json(data);
        }
      });
    }
  });

  app.delete('/posts', function(req, res) {
    req.models.Post.findByIdAndRemove(req.body.id, function(err, doc) {
      if(err)
        res.send(err);
      else
        res.sendStatus(200);
    });
  });

  app.post('/users', function(req, res) {
    new req.models.User({username: req.body.username,
      full_name: req.body.fullname, email: req.body.email,
      password: req.body.password}).save(function(err, user) {
        if(err) return res.status(400).send(req.models.User.humanMessages(err));
        else {
          req.session.user = user;
          res.status(200).send({message: "Logged in as " + user.username});
        }
    });
  });

  app.post('/sessions', function(req, res, next) {
    if(!req.body.email || !req.body.password) {
      console.log('here');
      res.status(401).send({message: ['Please enter both a password and an email account']});
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
                return res.status(401).send({message: ['Password is incorrect']});
              }
              else {
                req.session.user = user;
                return res.status(200).send({message: "Logged in as " + user.username});
              }
            });
          }
          else
            return res.status(401).send({message: ["User doesn't exist"]});
        });
    }
  });

  app.delete('/sessions', function(req, res) {
    delete req.session.user;
    res.sendStatus(200);
  });
};