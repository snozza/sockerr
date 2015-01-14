function Interface() {
  this.timeout;
};

Interface.prototype.loadPosts = function() {
  console.log('got here');
  $.get('http://localhost:3000/posts', function(data) {
    console.log(data)
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
      if(res.result == 'correct') {
          $('#signin').fadeOut('slow', function() {
              $(document.body).load(page, function() {
                $(this).fadeIn('slow', function() {
                  _this.loginNotice(res.message);
                });
              });
            });
      }
      else {
        _this.displayErrors(res.message)

      }
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
      if(res.result == 'correct') {
        $('#signup').fadeOut('slow', function() {
          $(document.body).load(page, function() {
            $(this).fadeIn('slow', function() {
              _this.loginNotice(res.message);
            });
          });
        });
      }
      else {
        _this.displayErrors(res);
      }
    }
  });
};

Interface.prototype.displayErrors = function(errorList) {
  console.log(this.timeout);
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
      if(result == 'correct') {
        socket.disconnect();
        $(document.body).load(page).fadeIn('slow');
      }
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
        if(result == 'correct') {
          socket.emit('delete-post', _id);
        }
      }
  });
};

var interfaceManager = new Interface();

$(document).ready(function() {

  $('#submit').on('click', function(event) {
    event.preventDefault();
    interfaceManager.makePost();
  });
      
  $("#login").on('click', function(event) {
    event.preventDefault();
    interfaceManager.validLogin();       
  });

  $('#logout').on('click', function(event) {
    event.preventDefault();
    interfaceManager.logout();
  });

  $('#new-user').on('click', function(event) {
    event.preventDefault();
    interfaceManager.signup();
  });

  $('.post-post').on('click', '.delete', function() {
    interfaceManager.deletePost(this);  
  });

  $('#signupbutton').on('click', function() {
    $('#signin').fadeOut('slow', function() {
      $('#signup').fadeIn('slow');
    });
  });
   
  $('#loginbutton').on('click', function() {
    $('#signup').fadeOut('slow', function() {
      $('#signin').fadeIn('slow');
    });
  });

  $('#home').on('click', function() {
    $('.post-post').empty();
    socket.emit('leave-main');
    $('.span4').fadeIn(function() {
      interfaceManager.loadPosts();
    });
  });

  $('#mainRoom').on('click', function() {
    $('.post-post').empty();
    socket.emit('main-room');
    $('.span4').fadeOut(function() {
      interfaceManager.loadGlobalPosts();
    });
  });
});
