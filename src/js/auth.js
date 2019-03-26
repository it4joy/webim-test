'use strict';

$('.btn-login').on('click', function() {
  document.location.assign('https://oauth.vk.com/authorize?client_id=6913753&redirect_uri=https://it4joy.ru/webim/app.php&display=popup&scope=friends&response_type=token&v=5.92&state=webim_test_app-auth');
});

let accessToken, script;

const dataWrapper = $('.vk-data-wrapper');

const getInfo = (accessToken) => {
  const urlInfoAboutProfile = "https://api.vk.com/method/users.get?fields=first_name&access_token=" + accessToken + "&v=5.92";
  $.ajax({
    url: urlInfoAboutProfile,
    type: 'GET',
    dataType: 'jsonp',
    success: function(result) {
      $(dataWrapper).append(`<p>Пользователь: ${result.response[0].first_name} ${result.response[0].last_name}</p>`);
    }
  });

  const urlInfoAboutFriends = "https://api.vk.com/method/friends.get?fields=nickname&order=random&access_token=" + accessToken + "&v=5.92";
  $.ajax({
    url: urlInfoAboutFriends,
    type: 'GET',
    dataType: 'jsonp',
    success: function(result) {
      $(dataWrapper).append('<p>Имена пяти случайных друзей:</p>');
      $.each(result.response.items, function(i, val) {
        if (i <= 4) {
          $(dataWrapper).append(`<p>${i + 1}. ${val.first_name} ${val.last_name}</p>`);
        }
      });
    },
  });
}

const getAccessToken = () => {
  const url = document.location.href;
  if (url.indexOf('access_token') != -1) {
    const accessTokenStartIndex = url.indexOf('token=');
    const accessTokenEndIndex = url.indexOf('&expires');
    accessToken = url.substring(accessTokenStartIndex + 6, accessTokenEndIndex);
    //console.log(`Token is: ${accessToken}`); // test
    getInfo(accessToken);
  }
};

document.addEventListener('DOMContentLoaded', getAccessToken);
