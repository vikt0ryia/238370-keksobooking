'use strict';

(function () {

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

  var hideElement = function (target) {
    target.classList.add('hidden');
  };

  var showElement = function (target) {
    target.classList.remove('hidden');
  };

  window.utils = {
    getRandomInRange: getRandomInRange,
    getRandomValueFromArray: getRandomValueFromArray,
    shuffleArray: shuffleArray,
    getRandomValuesFromArray: getRandomValuesFromArray,
    hideElement: hideElement,
    showElement: showElement
  };

})();
