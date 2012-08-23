(function() {

  define(['jquery', 'underscore', 'backbone', 'views/ViewManager', 'jqueryui', 'jquery.bootstrap'], function($, _, Backbone, VM) {
    var initialize;
    console.log("init");
    initialize = function() {
      var vm;
      vm = new VM();
      vm.render();
      if (!Array.prototype.indexOf) {
        return Array.prototype.indexOf = function(searchElement) {
          "use strict";
          var k, len, n, t;
          if (typeof this === "undefined" || this === null) throw new TypeError();
          t = Object(this);
          len = t.length >>> 0;
          if (len === 0) return -1;
          n = 0;
          if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n !== n) {
              n = 0;
            } else {
              if (n !== 0 && n !== Infinity && n !== -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
              }
            }
          }
          if (n >= len) return -1;
          k = (n >= 0 ? n : Math.max(len - Math.abs(n), 0));
          while (k < len) {
            if (k in t && t[k] === searchElement) return k;
            k++;
          }
          return -1;
        };
      }
    };
    return {
      initialize: initialize
    };
  });

}).call(this);
