'use strict';

(function () {

  var ADS_AMOUNT = 5;

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinList = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');

  var renderPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (ad.location.x - PIN_WIDTH / 2) + 'px; top: ' + (ad.location.y - PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;

    return pinElement;
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    if (ads.length > ADS_AMOUNT) {
      ads.length = ADS_AMOUNT;
    }

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(renderPin(ads[i]));
    }

    pinList.appendChild(fragment);

    window.card.openAdModal();
  };

  var removeMapPins = function () {
    var mapPins = document.querySelectorAll('.map__pins button:not(.map__pin--main)');
    mapPins.forEach(function (item) {
      pinList.removeChild(item);
    });
  };

  window.pin = {
    pinList: pinList,
    renderPins: renderPins,
    removeMapPins: removeMapPins
  };

})();
