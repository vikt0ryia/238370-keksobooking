'use strict';

(function () {

  var getEscCode = function () {
    var ESC_KEYCODE = 27;
    return ESC_KEYCODE;
  };

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

  window.utils = {
    getEscCode: getEscCode,
    getRandomInRange: getRandomInRange,
    getRandomValueFromArray: getRandomValueFromArray,
    shuffleArray: shuffleArray,
    getRandomValuesFromArray: getRandomValuesFromArray
  };

})();
