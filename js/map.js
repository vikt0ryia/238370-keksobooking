'use strict';

var AD_TITLE = ['Большая уютная квартира',
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

var AVATARS = [];
for (var i = 0; i < AD_QUANTITY; i++) {
  AVATARS[i] = 'img/avatars/user0' + (i + 1) + '.png';
}

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var TYPES_HOUSE = {
  house: 'Дом',
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало'
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandom = function (list) {
  return Math.floor(Math.random() * list.length);
};

var compareRandom = function (a, b) {
  return Math.random() - 0.5;
}

var ads = [];

var createAd = function () {
  var ad = {
    author: {
      avatar: AVATARS[avatarRand]
    },
    offer: {
      title: AD_TITLE[titleRand],
      address: x + ', ' + y,
      price: getRandomInRange(1000, 1000000),
      type: TYPES[getRandom(TYPES)],
      rooms: getRandomInRange(1, 5),
      guests: getRandomInRange(1, 5),
      checkin: AD_TIMES[getRandom(AD_TIMES)],
      checkout: AD_TIMES[getRandom(AD_TIMES)],
      features: adFeatures,
      description: '',
      photos: AD_PHOTOS.slice().sort(compareRandom)
    },
    location: {x: x,
      y: y}
  };

  return ad;
};

for (var j = 0; j < AD_QUANTITY; j++) {
  var avatarRand = getRandom(AVATARS);
  var titleRand = getRandom(AD_TITLE);
  var x = getRandomInRange(300, 900);
  var y = getRandomInRange(130, 630);
  var adFeatures = FEATURES.slice().sort(compareRandom);
  adFeatures.length = getRandom(adFeatures);

  ads[j] = createAd();

  AVATARS.splice(avatarRand, 1);
  AD_TITLE.splice(titleRand, 1);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var fragment = document.createDocumentFragment();
for (var l = 0; l < AD_QUANTITY; l++) {
  fragment.appendChild(renderPin(ads[l]));
}
pinList.appendChild(fragment);

var cardTemplate = document.querySelector('template')
  .content
  .querySelector('.map__card');

var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES_HOUSE[ad.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  var featuresContainer = cardElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  for (var i = 0; i < ad.offer.features.length; i++) {
    featuresContainer.innerHTML += '<li class="popup__feature popup__feature--' + ad.offer.features[i] + '"></li>';
  }

  cardElement.querySelector('.popup__description').textContent = ad.offer.description;

  var photosContainer = cardElement.querySelector('.popup__photos');
  var photoTemplate = photosContainer.querySelector('.popup__photo');
  photosContainer.removeChild(photoTemplate);
  for (var j = 0; j < ad.offer.photos.length; j++) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.src = ad.offer.photos[j];
    photosContainer.appendChild(photoElement);
  }

  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
};

var filtersContainer = document.querySelector('.map__filters-container');

var cardItem = renderCard(ads[0]);
map.insertBefore(cardItem, filtersContainer);
