'use strict';
(function () {

  var START_PIN_POSITION = {
    x: 570,
    y: 375
  };

  var adFields = window.map.adForm.querySelectorAll('fieldset');

  var typeSelect = window.map.adForm.querySelector('#type');
  var priceInput = window.map.adForm.querySelector('#price');

  var timeInSelect = window.map.adForm.querySelector('#timein');
  var timeOutSelect = window.map.adForm.querySelector('#timeout');

  var roomNumberSelect = window.map.adForm.querySelector('#room_number');
  var capacitySelect = window.map.adForm.querySelector('#capacity');

  var submitBtn = window.map.adForm.querySelector('.ad-form__submit');
  var resetBtn = window.map.adForm.querySelector('.ad-form__reset');

  var blockForm = function (status) {
    status = status || false;
    window.map.adForm.classList.toggle('ad-form--disabled', status);

    adFields.forEach(function (elem) {
      elem.disabled = status;
    });
  };

  var changeElementAttributes = function (elem, value) {
    elem.setAttribute('min', value);
    elem.setAttribute('placeholder', value);
  };

  typeSelect.addEventListener('change', function (evt) {
    changeElementAttributes(priceInput, window.card.houseTypes[evt.target.value].minPrice);
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
    window.map.adForm.querySelectorAll('input, select, textarea').forEach(function (item) {
      item.classList.remove('invalid');
    });
  };

  var resetCoordOfMainPin = function () {
    window.map.pinMain.style.left = START_PIN_POSITION.x + 'px';
    window.map.pinMain.style.top = START_PIN_POSITION.y + 'px';
    window.map.addValueToAddressInput();
  };

  var onResetBtnClick = function () {
    window.map.adForm.reset();
    removeFieldsInvalidity();
    window.card.closePopup();
    window.pin.hidePins(true);
    blockForm(true);
    window.map.makeMapOfFaded(true);
    resetCoordOfMainPin();
  };

  var onSuccess = function () {
    window.response.showResponse('Ваше объявление<br>успешно размещено!');
  };

  var onSubmitBtnClick = function (evt) {
    evt.preventDefault();
    if (window.map.adForm.checkValidity()) {
      window.backend.sendData(new FormData(window.map.adForm), onSuccess, window.pin.onError);
      onResetBtnClick();
    } else {
      var fields = window.map.adForm.querySelectorAll('input, select, textarea');

      removeFieldsInvalidity();

      fields.forEach(function (item) {
        if (!item.validity.valid) {
          item.classList.add('invalid');
        }
      });
    }
  };

  submitBtn.addEventListener('click', onSubmitBtnClick);

  resetBtn.addEventListener('click', onResetBtnClick);

  window.form = {
    blockForm: blockForm
  };

})();
