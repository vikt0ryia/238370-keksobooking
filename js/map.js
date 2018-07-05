'use strict';

(function () {

  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 85;

  var MIN_VALUE_Y = 130;
  var MAX_VALUE_Y = 630;

  var DEBOUNCE_INTERVAL = 500;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');

  var makeMapOfFaded = function (status) {
    status = status || false;
    map.classList.toggle('map--faded', status);
  };

  var addValueToAddressInput = function () {
    var coordXOfMainPin = (parseInt(pinMain.style.left, 10) + Math.floor(PIN_MAIN_WIDTH / 2));
    var coordYOfMaimPin = (parseInt(pinMain.style.top, 10) + PIN_MAIN_HEIGHT);
    addressInput.value = coordXOfMainPin + ', ' + coordYOfMaimPin;
  };

  addValueToAddressInput();
  window.filter.blockFilters(true);

  var uploadData = function (array) {
    window.map.data = array;
    updatePins();
  };

  var onError = function (message) {
    window.response.showResponse(message);
  };

  var updatePins = function () {
    window.card.closePopup();
    window.pin.removeMapPins();
    window.map.filteredAds = window.filter.filterAds(window.map.data);
    window.pin.renderPins(window.map.filteredAds);
  };

  var onFiltersChange = window.utils.debounce(updatePins, DEBOUNCE_INTERVAL);


  window.filter.filtersForm.addEventListener('change', onFiltersChange);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var bordersOfPinPosition = {
        minX: 0,
        maxX: map.offsetWidth - PIN_MAIN_WIDTH,
        minY: MIN_VALUE_Y - PIN_MAIN_HEIGHT,
        maxY: MAX_VALUE_Y - PIN_MAIN_HEIGHT
      };

      if (pinMain.offsetLeft - shift.x >= bordersOfPinPosition.minX &&
          pinMain.offsetLeft - shift.x <= bordersOfPinPosition.maxX &&
          pinMain.offsetTop - shift.y >= bordersOfPinPosition.minY &&
          pinMain.offsetTop - shift.y <= bordersOfPinPosition.maxY) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      addValueToAddressInput();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      makeMapOfFaded(false);
      window.filter.blockFilters(false);
      window.form.blockForm(false);

      window.backend.getData(uploadData, onError);

      window.card.renderAdCard();
      addValueToAddressInput();
      window.card.openAdModal();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    map: map,
    pinMain: pinMain,
    adForm: adForm,
    makeMapOfFaded: makeMapOfFaded,
    addValueToAddressInput: addValueToAddressInput
  };

})();
