function Interface() {
  this.timeout;
};

Interface.prototype.loadPosts = function() {
  $.get('http://localhost:3000/posts', function(data) {
    $.each(data, function(index, post) {
      $('<li class="post-body"><p class="post-user"><strong>' + post.full_name +'</strong> ' + post.createdAt.replace(/T/, ' ').replace(/\..+/, '') + '</p>' + post.body + 
          '<br><button class="post-user delete" data-id=' + post._id + ' type="submit">Delete</button></li>').hide().prependTo('.post-post').fadeIn('slow');
    });
  });
};

Interface.prototype.loadGlobalPosts = function() {
  $.get('http://localhost:3000/allposts', function(data) {
    $.each(data, function(index, post) {
      $('<li class="post-body"><p class="post-user"><strong>' + post.full_name +'</strong> ' + post.createdAt.replace(/T/, ' ').replace(/\..+/, '') + '</p>' + post.body + 
          '<br><button class="post-user delete" data-id=' + post._id + ' type="submit">Delete</button></li>').hide().prependTo('.post-post').fadeIn('slow');
    });
  });
};

Interface.prototype.makePost = function() {
  var body = $('#body')
    $.post('http://localhost:3000/posts', {post: body.val()}, function(data) {
      socket.emit('new-post', data);
      body.val('');
    });
};

Interface.prototype.validLogin = function() {
  var email = $('#email').val();
  var password = $('#password').val();
  _this = this;
  $.ajax({
    type: "POST",
    url: "/sessions",
    data: {email: email, password: password},
    cache: false,
    success: function(res) {
      var page = $(location).attr('href');
      $('#signin').fadeOut('slow', function() {
        $(document.body).load(page, function() {
          $(this).fadeIn('slow', function() {
            _this.loginNotice(res);
          });
        });
      });
    },
    error: function(res) {
      _this.displayErrors(res.responseJSON)
    }
  });
};

Interface.prototype.signup = function() {
  var email = $('#new-email').val();
  var password = $('#new-password').val();
  var fullname = $('#new-name').val();
  var username = $('#new-username').val();
  _this = this;
  $.ajax({
    url: '/users',
    type: 'POST',
    data: {email: email, password: password, fullname: fullname,
      username: username},
    cache: false,
    success: function(res) {
      var page = $(location).attr('href');
      $('#signup').fadeOut('slow', function() {
        $(document.body).load(page, function() {
          $(this).fadeIn('slow', function() {
            _this.loginNotice(res.responseJSON);
          });
        });
      });
    },
    error: function(res) {
      _this.displayErrors(res.responseJSON);
    }
  });
};

Interface.prototype.displayErrors = function(errorList) {
  var errorList = errorList.message
  clearTimeout(this.timeout);
    if(errorList.length > 0) {
      $('.tempMessages').html('<ul class="flash error"></ul>');
        for(var i=0; i < errorList.length; i++) {
          $('.flash').append('<li>' + errorList[i] + '</li>');
        }       
        this.timeout = setTimeout(function() {
        $('.flash').fadeOut('slow', function() {
          $(this).remove() })}, 5000);
      }
};    

Interface.prototype.loginNotice = function(message) {
  var message = message.message
  $('.tempMessages').html('<section class="flash notice">' + message + '</section>');
    var timeout = setTimeout(function() {
      $('.flash').fadeOut('slow', function() {
        $(this).remove() })}, 5000);
};   

Interface.prototype.logout = function() {
  $.ajax({
    url: '/sessions',
    type: 'DELETE',
    success: function(result) {
      var page = $(location).attr('href');
      socket.disconnect();
      $(document.body).load(page).fadeIn('slow');
    }
  });
};

Interface.prototype.deletePost = function(post) {
  var _id = $(post).data('id')
  $.ajax({
    url: '/posts',
    type: 'DELETE',
    data: {id: _id},
    success: function(result) {
        socket.emit('delete-post', _id);
    }
  });
};
