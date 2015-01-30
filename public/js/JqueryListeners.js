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