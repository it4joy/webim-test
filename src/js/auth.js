'use strict';

$('.btn-login').on('click', function() {
  document.location.assign('https://oauth.vk.com/authorize?client_id=6913753&redirect_uri=https://it4joy.ru/webim/app.php&display=popup&scope=friends,offline&response_type=token&v=5.92&state=webim_test_app-auth');
});

$('.btn-logout').on('click', function() {
  document.location.assign('https://it4joy.ru/webim/');
});

$('.return-btn').on('click', function() {
  document.location.assign('https://it4joy.ru/webim/app.php');
});

const dataWrapper = $('.vk-data-wrapper');
let accessToken, url;
let counter = 0;

const getInfo = (accessToken) => {
  const urlInfoAboutProfile = "https://api.vk.com/method/users.get?fields=first_name&access_token=" + accessToken + "&v=5.92";
  $.ajax({
    url: urlInfoAboutProfile,
    type: 'GET',
    dataType: 'jsonp',
    success: function(result) {
      $(dataWrapper).append(`<p><strong>Пользователь:</strong> ${result.response[0].first_name} ${result.response[0].last_name}</p>`);
    }
  });

  const urlInfoAboutFriends = "https://api.vk.com/method/friends.get?fields=nickname&order=random&access_token=" + accessToken + "&v=5.92";
  $.ajax({
    url: urlInfoAboutFriends,
    type: 'GET',
    dataType: 'jsonp',
    success: function(result) {
      $(dataWrapper).append('<p class=\'p-bold\'>Имена пяти случайных друзей:</p>');
      $(dataWrapper).append('<ol class=\'list random-friends-list\'>');
      $.each(result.response.items, function(i, val) {
        if (i <= 4) {
          $('.random-friends-list').append(`<li>${i + 1}. ${val.first_name} ${val.last_name}</li>`);
        }
      });
    },
  });
}

const checkAccessToken = () => {
  if ( window.localStorage.getItem('accessToken') ) {
    if ( $('div').hasClass('login-box') ) {
      $('.login-box').find('.btn-login').text('Вернуться в приложение');
      $('.btn-login').addClass('return-btn');
    }
  }
};

// after redirect to app.php
const getAccessToken = () => {
  url = document.location.href;
  if ( url.indexOf('access_token') != -1 && counter < 2 ) {
    const accessTokenStartIndex = url.indexOf('token=');
    const accessTokenEndIndex = url.indexOf('&expires');
    accessToken = url.substring(accessTokenStartIndex + 6, accessTokenEndIndex);
    //console.log(`Token is: ${accessToken}`); // test
    window.localStorage.setItem('accessToken', accessToken);
    getInfo(accessToken);
  } else if ( url.indexOf('app') != -1 ) {
    getInfo(accessToken);
  } else {
    return false;
  }
  counter++;
};

document.addEventListener('DOMContentLoaded', getAccessToken);
document.addEventListener('DOMContentLoaded', checkAccessToken);
