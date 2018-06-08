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

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandom = function (list) {
  return Math.floor(Math.random() * list.length);
};

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

var ads = [];
for (var j = 0; j < AD_QUANTITY; j++) {
  var avatarRand = getRandom(AVATARS);
  var titleRand = getRandom(AD_TITLE);
  var adFeatures = FEATURES.slice().sort(compareRandom);
  adFeatures.length = getRandom(adFeatures);
  ads[j] = {
    author: {
      avatar: AVATARS[avatarRand]
    },
    offer: {
      title: AD_TITLE[titleRand],
      address: 'location.x, location.y',
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
    location: {x: getRandomInRange(300, 900),
      y: getRandomInRange(130, 630)}
  };
  AVATARS.splice(avatarRand, 1);
  AD_TITLE.splice(titleRand, 1);
}

console.log(ads);
