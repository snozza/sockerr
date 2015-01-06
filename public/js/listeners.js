interfaceManager.loadPosts(); 
  var socket = io();
  socket.on('new-post', function(data) {
      $('<li class="post-body"><p class="post-user"><strong>' + data.full_name +'</strong> ' + data.createdAt.replace(/T/, ' ').replace(/\..+/, '') + '</p>' + data.body + 
      '<br><button class="post-user delete" data-id=' + data._id + ' type="submit">Delete</button></li>').hide().prependTo('.post-post').fadeIn('slow');
  });

  socket.on('delete-post', function(_id) {
      $('.post-post').find("[data-id='" + _id + "']").closest('.post-body').remove().fadeOut('slow');
  });