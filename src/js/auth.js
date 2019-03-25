'use strict';

$('.btn-login').on('click', function() {
  document.location.assign('https://oauth.vk.com/authorize?client_id=6913753&redirect_uri=http://pool.graphicalshell.ru/webim/app.html&display=popup&scope=friends&response_type=token&v=5.92&state=webim_test_app-auth');
});
