'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinList = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.classList.add('hidden');
    pinElement.style = 'left: ' + (ad.location.x - PIN_WIDTH / 2) + 'px; top: ' + (ad.location.y - PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }

    pinList.appendChild(fragment);
  };

  var hidePins = function (status) {
    status = status || false;
    var mapPins = pinList.querySelectorAll('.map__pins button:not(.map__pin--main)');
    mapPins.forEach(function (elem) {
      elem.classList.toggle('hidden', status);
    });
  };

  var onError = function (message) {
    window.response.showResponse(message);
  };

  window.backend.getData(renderPins, onError);

  window.pin = {
    pinList: pinList,
    renderPins: renderPins,
    hidePins: hidePins,
    onError: onError
  };

})();
