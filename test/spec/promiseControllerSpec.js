/*global PromiseController, runs, waitsFor */

describe('Promise Controller', function () {

  it('returns an object with bound promise methods', function () {
    var Controller =  new PromiseController();
    expect(Controller.then).toBeTruthy();
    expect(Controller.done).toBeTruthy();
    expect(Controller.fail).toBeTruthy();
  });

  it('has an method initialize to be implemented', function () {
    var Controller = PromiseController.extend({
      initialize : function(options, resolve, reject) {
        expect(options).toBeTruthy();
        expect(resolve).toBeTruthy();
        expect(reject).toBeTruthy();
      }
    });
    new Controller();
  });

  it('can have its promise resolved within initialize', function () {
    var Controller = PromiseController.extend({
      initialize : function(options, resolve, reject) {
        resolve({ foo : 'bar' });
      }
    });

    var promise = new Controller();
    promise.then(function(obj) {
      expect(obj.foo).toEqual('bar');
      });
    promise.done(function(obj) {
      expect(obj.foo).toEqual('bar');
    });
  });

  it('can have its promise rejected within initialize', function () {
    var Controller = PromiseController.extend({
      initialize : function(options, resolve, reject) {
        reject({ foo : 'bar' });
      }
    });

    var promise = new Controller();
    promise.fail(function(obj) {
      expect(obj.foo).toEqual('bar');
    });
  });

});