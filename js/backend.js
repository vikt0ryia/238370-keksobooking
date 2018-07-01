'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';

  var REQUEST_TIMEOUT = 10000;
  var REQUEST_STATUS_OK = 200;

  var createRequest = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = REQUEST_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === REQUEST_STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка! Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var getData = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var sendData = function (data, onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

  window.backend = {
    getData: getData,
    sendData: sendData
  };

})();
