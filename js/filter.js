'use strict';

(function () {

  var ANY_VALUE = 'any';
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var PRICE_VALUES = {
    LOW: 'low',
    HIGH: 'high',
    MIDDLE: 'middle'
  };

  var filtersForm = document.querySelector('.map__filters');
  var filterType = filtersForm.querySelector('#housing-type');
  var filterPrice = filtersForm.querySelector('#housing-price');
  var filterRooms = filtersForm.querySelector('#housing-rooms');
  var filterGuests = filtersForm.querySelector('#housing-guests');
  var filterFeatures = filtersForm.querySelector('#housing-features');

  var blockFilters = function (status) {
    status = status || false;
    var fields = window.filter.filtersForm.querySelectorAll('input, select');
    fields.forEach(function (elem) {
      elem.disabled = status;
    });
  };

  var compareValue = function (adValue, filterValue) {
    return filterValue === ANY_VALUE || filterValue === adValue.toString();
  };

  var getPriceRangeAd = function (price) {
    switch (true) {
      case price < MIN_PRICE:
        return PRICE_VALUES.LOW;
      case price > MAX_PRICE:
        return PRICE_VALUES.HIGH;
      default:
        return PRICE_VALUES.MIDDLE;
    }
  };

  var compareFeatures = function (adFeatures) {
    var result = true;

    filterFeatures.querySelectorAll('input:checked').forEach(function (item) {
      if (adFeatures.indexOf(item.value) === -1) {
        result = false;
      }
    });

    return result;
  };

  var filterAds = function (ads) {
    return ads.filter(function (ad) {
      return compareValue(ad.offer.type, filterType.value) &&
        compareValue(getPriceRangeAd(ad.offer.price), filterPrice.value) &&
        compareValue(ad.offer.rooms, filterRooms.value) &&
        compareValue(ad.offer.guests, filterGuests.value) &&
        compareFeatures(ad.offer.features);
    });
  };

  window.filter = {
    filtersForm: filtersForm,
    blockFilters: blockFilters,
    filterAds: filterAds
  };

})();
