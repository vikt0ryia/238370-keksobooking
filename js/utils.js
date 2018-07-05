'use strict';

(function () {

  var hideElement = function (target) {
    target.classList.add('hidden');
  };

  var showElement = function (target) {
    target.classList.remove('hidden');
  };

  var debounce = function (fun, interval) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, interval);
    };
  };

  window.utils = {
    hideElement: hideElement,
    showElement: showElement,
    debounce: debounce
  };

})();
