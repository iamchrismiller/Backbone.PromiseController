/*global define, Backbone, _*/

;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () { return factory(); });
  } else {
    root.PromiseController = Backbone.PromiseController = factory();
  }
}(this, function () {

  var PromiseController = function (options) {
    var deferred = $.Deferred(),
     promise = deferred.promise(),
     resolve = deferred.resolve.bind(deferred),
     reject = deferred.reject.bind(deferred);

    //public controller methods called upon
    //resolve/rejection of the promise
    this.then = promise.then.bind(promise);
    this.done = promise.done.bind(promise);
    this.fail = promise.fail.bind(promise);

    this.initialize.apply(this, [options || {},resolve,reject]);
  };

  //Use Backbone Extend Paradigm
  PromiseController.extend = Backbone.Model.extend;

  //noops
  _.extend(PromiseController.prototype, {

    //setup/reject/resolve
    initialize: function(){},

    //.resolve resultset
    getResolution : function() {},

    //.reject resultset
    getRejection : function() {}
  });

  return PromiseController;
}));