function init() {
  $.get('http://localhost:3000/posts', function(data) {
  console.log(data);
  });
}

init()