function loadPosts() {
  $.get('http://localhost:3000/posts', function(data) {
      $.each(data.reverse(), function(index, post) {
          console.log(post)
          $('.post-post').append('<li class="post-body">' + post.body + '<p class="post-user">' + post.createdAt + '</p></li>').fadeIn('slow');
      });
  });
}

function makePost() {
  var body = $('#body').val();
      $.post('http://localhost:3000/posts', {post: body}, function(data) {
          socket.emit('new-post', data);
      });
}

function validLogin() {
  var email = $('#email').val();
  var password = $('#password').val();
  $.ajax({
    type: "POST",
    url: "/sessions",
    data: {"email": email, "password":password},
    cache: false,
    success: function(result) {
      var page = $(location).attr('href');
      if(result == 'correct') {
          $('.form-signin').fadeOut('slow', function() {
              $(document.body).load(page).fadeIn('slow');
          });
      }
      else {
          console.log('fail');
          return false;
      }
    }
  });
}

$(document).ready(function() {

  $('#submit').on('click', function(event) {
      event.preventDefault();
      makePost();
  });
      
  $("#login").on('click', function(event) {
      event.preventDefault();
      validLogin();       
  });
});
