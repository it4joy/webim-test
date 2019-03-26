'use strict';

$('.btn-login').on('click', function() {
  document.location.assign('https://oauth.vk.com/authorize?client_id=6913753&redirect_uri=https://it4joy.ru/webim/app.php&display=popup&scope=friends&response_type=accessToken&v=5.92&state=webim_test_app-auth');
});

let accessToken, script;

const getInfo = (accessToken) => {
  /* $.ajax({
    url: 'backend/requestHandler.php',
    data: {
      fields: 'nickname',
      order: 'random',
      accessToken: accessToken,
      v: '5.92'
    },
    success: function() {
      console.log(data.first_name);
    }
  }); */
  
  // actual (JSONP)

  script = document.createElement('script');
  script.src = "https://api.vk.com/method/friends.get?fields=nickname&order=random&access_token=" + accessToken + "&v=5.92&callback=callbackGetInfo";
  document.getElementsByTagName('head')[0].appendChild(script);
  function callbackGetInfo(result) {
    alert(result.response.items[0].first_name);
  }
  //

  /* $.get(
    "https://api.vk.com/method/friends.get?fields=nickname&order=random&access_token=" + accessToken + "&v=5.92",
    function(data) {
      console.log(data.first_name);
    }
  ); */
}

const getAccessToken = () => {
  const url = document.location.href;
  if (url.indexOf('access_token') != -1) {
    const accessTokenStartIndex = url.indexOf('token=');
    const accessTokenEndIndex = url.indexOf('&expires');
    accessToken = url.substring(accessTokenStartIndex + 6, accessTokenEndIndex);
    console.log(`Token is: ${accessToken}`); // test
    getInfo(accessToken);
  }
};

//document.addEventListener('DOMContentLoaded', getAccessToken);
window.onload = getAccessToken();
