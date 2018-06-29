'use strict';

(function () {

  var AD_QUANTITY = 8;

  var AD_TITLES = ['Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];

  var AD_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var AD_TIMES = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var AD_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var AD_PRICES = {
    min: 1000,
    max: 1000000
  };

  var AD_ROOMS = {
    min: 1,
    max: 5
  };

  var MIN_VALUE_X = 300;
  var MAX_VALUE_X = 900;

  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;

  var createAd = function (i) {
    var x = window.utils.getRandomInRange(MIN_VALUE_X, MAX_VALUE_X);
    var y = window.utils.getRandomInRange(MIN_VALUE_Y, MAX_VALUE_Y);

    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: AD_TITLES[i],
        address: x + ', ' + y,
        price: window.utils.getRandomInRange(AD_PRICES.min, AD_PRICES.max),
        type: window.utils.getRandomValueFromArray(AD_TYPES),
        rooms: window.utils.getRandomInRange(AD_ROOMS.min, AD_ROOMS.max),
        guests: window.utils.getRandomInRange(AD_ROOMS.min, AD_ROOMS.max),
        checkin: window.utils.getRandomValueFromArray(AD_TIMES),
        checkout: window.utils.getRandomValueFromArray(AD_TIMES),
        features: window.utils.getRandomValuesFromArray(AD_FEATURES),
        description: '',
        photos: window.utils.shuffleArray(AD_PHOTOS)
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

  var ads = createAds();

  window.data = {
    minValueY: MIN_VALUE_Y,
    maxValueY: MAX_VALUE_Y,
    ads: ads
  };

})();
