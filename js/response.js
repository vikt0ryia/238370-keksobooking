'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var response = document.querySelector('.response');
  var responseMessage = response.querySelector('.response__message');

  var onResponseClick = function () {
    window.utils.hideElement(response);
    document.removeEventListener('click', onResponseClick);
    document.removeEventListener('keydown', onResponseEscPress);
  };

  var onResponseEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.utils.hideElement(response);
      document.removeEventListener('click', onResponseClick);
      document.removeEventListener('keydown', onResponseEscPress);
    }
  };

  var hideResponseByTime = function () {
    setTimeout(function () {
      window.utils.hideElement(response);
      document.removeEventListener('click', onResponseClick);
      document.removeEventListener('keydown', onResponseEscPress);
    }, 5000);
  };

  var showResponse = function (message) {
    window.utils.showElement(response);
    responseMessage.textContent = message;

    document.addEventListener('click', onResponseClick);
    document.addEventListener('keydown', onResponseEscPress);

    hideResponseByTime();
  };

  window.response = {
    ESC_KEYCODE: ESC_KEYCODE,
    showResponse: showResponse
  };

})();
