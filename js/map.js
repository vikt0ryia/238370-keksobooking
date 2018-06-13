'use strict';

var AD_TITLES = ['Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var AD_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var AD_QUANTITY = 8;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var HOUSE_TYPES = {
  house: 'Дом',
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало'
};

var map = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');

var cardTemplate = document.querySelector('template')
  .content
  .querySelector('.map__card');

var pinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValueFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var shuffleArray = function (array) {
  var newArray = array.slice();
  newArray = newArray.sort(function () {
    return Math.random() - 0.5;
  });
  return newArray;
};

var getRandomValuesFromArray = function (array) {
  var newArray = shuffleArray(array);
  newArray.length = getRandomInRange(0, array.length);
  return newArray;
};

var createAd = function (i) {
  var x = getRandomInRange(300, 900);
  var y = getRandomInRange(130, 630);

  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },
    offer: {
      title: AD_TITLES[i],
      address: x + ', ' + y,
      price: getRandomInRange(1000, 1000000),
      type: getRandomValueFromArray(TYPES),
      rooms: getRandomInRange(1, 5),
      guests: getRandomInRange(1, 5),
      checkin: getRandomValueFromArray(AD_TIMES),
      checkout: getRandomValueFromArray(AD_TIMES),
      features: getRandomValuesFromArray(FEATURES),
      description: '',
      photos: shuffleArray(AD_PHOTOS)
    },
    location: {x: x,
      y: y}
  };
  return ad;
};

var createAds = function () {
  var ads = [];
  for (var i = 0; i < AD_QUANTITY; i++) {
    ads[i] = createAd(i);
  }
  return ads;
};

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + (ad.location.x - PIN_WIDTH / 2) + 'px; top: ' + (ad.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();

var renderPins = function (ads) {
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return fragment;
};

var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HOUSE_TYPES[ad.offer.type];
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
  photosContainer.removeChild(photoTemplate);
  for (var l = 0; l < ad.offer.photos.length; l++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.src = ad.offer.photos[l];
    photosContainer.appendChild(photoElement);
  }

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
};

var adsKeksobooking = createAds();

pinList.appendChild(renderPins(adsKeksobooking));

var cardItem = renderCard(adsKeksobooking[0]);
map.insertBefore(cardItem, filtersContainer);

map.classList.remove('map--faded');
