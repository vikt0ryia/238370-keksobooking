'use strict';

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

var AD_QUANTITY = 8;

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 85;

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

var map = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFields = adForm.querySelectorAll('fieldset');
var addressInput = adForm.querySelector('#address');

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
  newArray.length = getRandomInRange(1, array.length);
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
      type: getRandomValueFromArray(AD_TYPES),
      rooms: getRandomInRange(1, 5),
      guests: getRandomInRange(1, 5),
      checkin: getRandomValueFromArray(AD_TIMES),
      checkout: getRandomValueFromArray(AD_TIMES),
      features: getRandomValuesFromArray(AD_FEATURES),
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

var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return fragment;
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

var renderAdCard = function () {
  var cardElement = map.querySelector('.map__card');

  if (!cardElement) {
    cardElement = cardTemplate.cloneNode(true);
    map.insertBefore(cardElement, filtersContainer);
    cardElement.classList.add('hidden');

    var popupClose = cardElement.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      hideElement(cardElement);
      var pinActiv = map.querySelector('.map__pin--active');
      pinActiv.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onPopupEscPress);
    });
  }
};


var hideElement = function (target) {
  target.classList.add('hidden');
};

var showElement = function (target) {
  target.classList.remove('hidden');
};

var makeMapOfFaded = function (status) {
  status = status || false;
  map.classList.toggle('map--faded', status);
};

var blockForm = function (status) {
  status = status || false;
  adForm.classList.toggle('ad-form--disabled', status);

  adFields.forEach(function (elem) {
    elem.disabled = status;
  });
};

var addValueToAddressInput = function () {
  var coordXOfMainPin = (parseInt(pinMain.style.left, 10) + Math.floor(PIN_MAIN_WIDTH / 2));
  var coordYOfMaimPin = (parseInt(pinMain.style.top, 10) + PIN_MAIN_HEIGHT);
  addressInput.value = coordXOfMainPin + ',' + coordYOfMaimPin;
};

var removeMapPins = function () {
  var mapPins = document.querySelectorAll('.map__pins button:not(.map__pin--main)');
  mapPins.forEach(function (item) {
    pinList.removeChild(item);
  });
};

var openAdModal = function () {
  var mapPins = pinList.querySelectorAll('.map__pins button:not(.map__pin--main)');
  var adCard = map.querySelector('.map__card');

  mapPins.forEach(function (elem, i) {
    elem.addEventListener('click', function () {
      closePopup();
      elem.classList.add('map__pin--active');
      fillInTheAdCard(adCard, ads[i]);
      showElement(adCard);
    });
  });

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  var card = map.querySelector('.map__card');
  if (card) {
    hideElement(card);
    document.removeEventListener('keydown', onPopupEscPress);

    var activePin = pinList.querySelector('.map__pin--active');
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

var renderAdPins = function () {
  ads = createAds();
  pinList.appendChild(renderPins(ads));
};

var ads = [];

pinMain.addEventListener('mouseup', function () {
  removeMapPins();
  closePopup();
  makeMapOfFaded(false);
  blockForm(false);
  renderAdPins();
  renderAdCard();
  addValueToAddressInput();
  openAdModal();
});

// module4-task2 -------------------------------------

var typeSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');

var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');

var submitBtn = adForm.querySelector('.ad-form__submit');
var resetBtn = adForm.querySelector('.ad-form__reset');


var changeElementAttributes = function (elem, value) {
  elem.setAttribute('min', value);
  elem.setAttribute('placeholder', value);
};

typeSelect.addEventListener('change', function (evt) {
  changeElementAttributes(priceInput, HOUSE_TYPES[evt.target.value].minPrice);
});


var syncTimeFields = function (timeSrc, timeDst) {
  timeDst.value = timeSrc.value;
};

timeInSelect.addEventListener('change', function () {
  syncTimeFields(timeInSelect, timeOutSelect);
});

timeOutSelect.addEventListener('change', function () {
  syncTimeFields(timeOutSelect, timeInSelect);
});


var syncRoomAndCapacity = function () {
  var roomNumber = parseInt(roomNumberSelect.value, 10);
  var guestCount = parseInt(capacitySelect.value, 10);

  if (roomNumber === 100 && guestCount > 0) {
    capacitySelect.setCustomValidity('Доступно только не для гостей');
  } else if (roomNumber < 100 && guestCount === 0) {
    capacitySelect.setCustomValidity('Выберите количество гостей');
  } else if (guestCount > roomNumber) {
    capacitySelect.setCustomValidity('Максимальное количество гостей: ' + roomNumber);
  } else {
    capacitySelect.setCustomValidity('');
  }
};

roomNumberSelect.addEventListener('change', syncRoomAndCapacity);
capacitySelect.addEventListener('change', syncRoomAndCapacity);


var removeFieldsInvalidity = function () {
  adForm.querySelectorAll('input, select, textarea').forEach(function (item) {
    item.classList.remove('invalid');
  });
};

var onResetBtnClick = function () {
  adForm.reset();
  removeFieldsInvalidity();
  closePopup();
  removeMapPins();
  blockForm(true);
  makeMapOfFaded(true);
};

var onSubmitBtnClick = function () {
  var fields = adForm.querySelectorAll('input, select, textarea');

  removeFieldsInvalidity();

  fields.forEach(function (item) {
    if (!item.validity.valid) {
      item.classList.add('invalid');
    }
  });
};

submitBtn.addEventListener('click', onSubmitBtnClick);

resetBtn.addEventListener('click', onResetBtnClick);
