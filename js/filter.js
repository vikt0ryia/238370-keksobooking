'use strict';

(function () {

  var VALUE_ANY = 'any';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var filtersForm = document.querySelector('.map__filters');
  var filterType = filtersForm.querySelector('#housing-type');
  var filterPrice = filtersForm.querySelector('#housing-price');
  var filterRooms = filtersForm.querySelector('#housing-rooms');
  var filterGuests = filtersForm.querySelector('#housing-guests');
  var filterFeatures = filtersForm.querySelector('#housing-features');

  var compareValue = function (adValue, filterValue) {
    return filterValue === VALUE_ANY || filterValue === adValue.toString();
  };

  var getPriceRangeAd = function (price) {
    switch (true) {
      case price < PRICE_LOW:
        return 'low';
      case price > PRICE_HIGH:
        return 'high';
      default:
        return 'middle';
    }
  };

  var compareFeatures = function (adList) {
    var selectedFeatures = [];
    filterFeatures.querySelectorAll('input:checked').forEach(function (item) {
      selectedFeatures.push(item.value);
    });

    for (var i = 0; i < selectedFeatures.length; i++) {
      if (adList.indexOf(selectedFeatures[i]) === -1) {
        return false;
      }
    }

    return true;
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
    filterAds: filterAds
  };

})();
