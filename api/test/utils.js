import assert from 'assert';
import * as utils from '../utils.js';

describe('utils', function() {
  describe('getCategoryFromScalar', function() {
    const categoryMap = {
      smallest: 5,
      mediumest: 10,
      largest: 100,
    };

    it('returns the smallest value in the map when passed a scalar smaller than any number in the map', function() {
      assert(utils.getCategoryFromScalar(1, categoryMap, 'fallback') === 'smallest');
    });

    it('returns the next-largest value when the scalar is larger than the smallest category', function() {
      assert(utils.getCategoryFromScalar(8, categoryMap, 'fallback') === 'mediumest');
    });

    it('returns the fallback when the scalar is larger than anything in the category map', function() {
      assert(utils.getCategoryFromScalar(800, categoryMap, 'fallback') === 'fallback');
    });
  });

  describe('getWindinessFromSpeed', function() {
    it('doesn\'t find it windy if the wind speed <= 2', function() {
      assert(utils.getWindinessFromSpeed(0) === 'not');
      assert(utils.getWindinessFromSpeed(1) === 'not');
      assert(utils.getWindinessFromSpeed(2) === 'not');
    });
    it('thinks it\'s extremely windy indeed, if speed > 25 and <=40', function() {
      assert(utils.getWindinessFromSpeed(26) === 'extremely');
      assert(utils.getWindinessFromSpeed(40) === 'extremely');

      assert(!(utils.getWindinessFromSpeed(25) === 'extremely'));
      assert(!(utils.getWindinessFromSpeed(41) === 'extremely'));
    });
    it('returns a catch-all value if the speed is ridiculous', function() {
      assert(utils.getWindinessFromSpeed(80000) === 'apocalyptically');
    });
  });

  describe('getCloudinessFromCoverage', function() {
    it("doesn't find it cloudy at less than 5% cloud coverage", function() {
      assert(utils.getCloudinessFromCoverage(4) === 'not');
      assert(!(utils.getCloudinessFromCoverage(6) === 'not'));
    });
    it("finds it noticeably cloudy between 26% and 50% cloud coverage", function() {
      assert(utils.getCloudinessFromCoverage(26) === 'noticeably');
      assert(utils.getCloudinessFromCoverage(50) === 'noticeably');

      assert(!(utils.getCloudinessFromCoverage(25) === 'noticeably'));
      assert(!(utils.getCloudinessFromCoverage(51) === 'noticeably'));
    });
  });

  describe('getWarmnessFromTemperature', function() {
    it("finds it super cold below 40ºC", function() {
      assert(!(utils.getWarmnessFromTemperature(-39) === 'super cold'));
      assert(utils.getWarmnessFromTemperature(-40) === 'super cold');
      assert(utils.getWarmnessFromTemperature(-50) === 'super cold');
    });
    it("finds it very hot between 31-35ºC", function() {
      assert(utils.getWarmnessFromTemperature(31) === 'very hot');
      assert(utils.getWarmnessFromTemperature(35) === 'very hot');

      assert(!(utils.getWarmnessFromTemperature(30) === 'very hot'));
      assert(!(utils.getWarmnessFromTemperature(36) === 'very hot'));
    });
    it("finds it super hot at ridiculous temperatures", function() {
      assert(utils.getWarmnessFromTemperature(40) === 'super hot');
      assert(utils.getWarmnessFromTemperature(400) === 'super hot');
    });
  });
});
