'use strict';

(function () {

  var HOUSE_TYPES = {
    'palace': {
      name: 'Дворец',
      minPrice: '10000'
    },
    'flat': {
      name: 'Квартира',
      minPrice: '1000'
    },
    'house': {
      name: 'Дом',
      minPrice: '5000'
    },
    'bungalo': {
      name: 'Бунгало',
      minPrice: '0'
    }
  };

  var ESC_KEYCODE = 27;

  var cardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');

  var filtersContainer = document.querySelector('.map__filters-container');

  var renderAdCard = function () {
    var cardElement = window.map.map.querySelector('.map__card');

    if (!cardElement) {
      cardElement = cardTemplate.cloneNode(true);
      window.map.map.insertBefore(cardElement, filtersContainer);
      hideElement(cardElement);

      var popupClose = cardElement.querySelector('.popup__close');
      popupClose.addEventListener('click', function () {
        hideElement(cardElement);
        var pinActive = window.map.map.querySelector('.map__pin--active');
        pinActive.classList.remove('map__pin--active');
        document.removeEventListener('keydown', onPopupEscPress);
      });
    }
  };

  var fillInTheAdCard = function (cardElement, ad) {

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = HOUSE_TYPES[ad.offer.type].name;
    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var featuresContainer = cardElement.querySelector('.popup__features');
    featuresContainer.innerHTML = '';
    for (var k = 0; k < ad.offer.features.length; k++) {
      featuresContainer.innerHTML += '<li class="popup__feature popup__feature--' + ad.offer.features[k] + '"></li>';
    }

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    var photosContainer = cardElement.querySelector('.popup__photos');
    var photoTemplate = photosContainer.querySelector('.popup__photo');
    photosContainer.innerHTML = '';
    for (var l = 0; l < ad.offer.photos.length; l++) {
      var photoElement = photoTemplate.cloneNode(true);
      photoElement.src = ad.offer.photos[l];
      photosContainer.appendChild(photoElement);
    }

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return cardElement;
  };

  var hideElement = function (target) {
    target.classList.add('hidden');
  };

  var showElement = function (target) {
    target.classList.remove('hidden');
  };

  var openAdModal = function () {
    var mapPins = window.pin.pinList.querySelectorAll('.map__pins button:not(.map__pin--main)');
    var adCard = window.map.map.querySelector('.map__card');

    mapPins.forEach(function (elem, i) {
      elem.addEventListener('click', function () {
        closePopup();
        elem.classList.add('map__pin--active');
        fillInTheAdCard(adCard, window.data.ads[i]);
        showElement(adCard);

        document.addEventListener('keydown', onPopupEscPress);
      });
    });

  };

  var closePopup = function () {
    var card = window.map.map.querySelector('.map__card');
    if (card) {
      hideElement(card);
      document.removeEventListener('keydown', onPopupEscPress);

      var activePin = window.pin.pinList.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  window.card = {
    houseTypes: HOUSE_TYPES,
    renderAdCard: renderAdCard,
    openAdModal: openAdModal,
    closePopup: closePopup
  };

})();
