(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('Basic Lottery Tests', {
    // This will run before each test in this module.
    setup: function() {
      this.manager = new LotteryManager();
    }
  });

  test('adam is winner', function() {
      var adam = new Participant('Adam', true);
      adam.lotterySet.addRange([1, 2, 3, 4, 5]);
      this.manager.addParticipant(adam);
      //hijack generate set, removing randomness
      this.manager.lotterySet.generateSet = function() {
        this.addRange([1,2,3,4,5]);
      }
      this.manager.performLottery();
      equal(adam.won, true);
  });
  
  test('adam is unordered winner', function() {
      var adam = new Participant('Adam', true);
      adam.lotterySet.addRange([1, 2, 3, 4, 5]);
      this.manager.addParticipant(adam);
      //hijack generate set, removing randomness
      this.manager.lotterySet.generateSet = function() {
        this.addRange([5,4,3,2,1]);
      }
      this.manager.performLottery();
      equal(adam.won, true);
  });
  
  test('adam is not winner', function() {
      var adam = new Participant('Adam', true);
      adam.lotterySet.addRange([1, 2, 3, 4, 5]);
      this.manager.addParticipant(adam);
      //hijack generate set, removing randomness
      this.manager.lotterySet.generateSet = function() {
        this.addRange([2,3,4,5,6]);
      }
      this.manager.performLottery();
      equal(adam.won, false);
  });
  
  test('adam picks bad numbers', function() {
      var adam = new Participant('Adam', true);
      adam.lotterySet.addRange([1, 2, 30, 40, 50]);
      var me = this;
      throws(function() {
        me.manager.addParticipant(adam);
        me.manager.performLottery();
      }, 'participant Adam not ready');
  });
  
  test('adam picks non unique numbers', function() {
      var adam = new Participant('Adam', true);
      adam.lotterySet.addRange([1, 2, 3, 3, 4]);
      var me = this;
      throws(function() {
        me.manager.addParticipant(adam);
        me.manager.performLottery();
      }, 'participant Adam not ready');
  });
  
  test('adam has no name', function() {
      var adam = new Participant(null, true);
      adam.lotterySet.addRange([1, 2, 30, 40, 50]);
      var me = this;
      throws(function() {
        me.manager.addParticipant(adam);
        me.manager.performLottery();
      }, 'participant Adam not ready');
  });
  
  test('contains', function() {
      var adam = new Participant(null, true);
      adam.lotterySet.addRange([1, 2, 3, 4, 5]);
      var con = adam.lotterySet.contains(1);
      console.log(con);
      equal(con, true);
      con = adam.lotterySet.contains(20);
      equal(con, false);
  });


}(jQuery));
