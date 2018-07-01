'use strict';

(function () {

  var response = document.querySelector('.response');
  var responseMessage = response.querySelector('.response__message');

  var onResponseClick = function () {
    window.card.hideElement(response);
    document.removeEventListener('click', onResponseClick);
    document.removeEventListener('keydown', onResponseEscPress);
  };

  var onResponseEscPress = function (evt) {
    if (evt.keyCode === window.utils.getEscCode()) {
      window.card.hideElement(response);
      document.removeEventListener('click', onResponseClick);
      document.removeEventListener('keydown', onResponseEscPress);
    }
  };

  var hideResponseByTime = function () {
    setTimeout(function () {
      window.card.hideElement(response);
      document.removeEventListener('click', onResponseClick);
      document.removeEventListener('keydown', onResponseEscPress);
    }, 5000);
  };

  var showResponse = function (message) {
    window.card.showElement(response);
    responseMessage.textContent = message;

    document.addEventListener('click', onResponseClick);
    document.addEventListener('keydown', onResponseEscPress);

    hideResponseByTime();
  };

  window.response = {
    showResponse: showResponse
  };

})();
