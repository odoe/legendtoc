(function() {

  define(['jquery', 'underscore', 'backbone', 'views/map/MapView', 'views/tools/legendtoc/operationalview', 'jqueryui', 'esri/dijit/Popup'], function($, _, Backbone, MapView, OperationalView) {
    var ViewManager;
    return ViewManager = Backbone.View.extend({
      el: $('#container-main'),
      render: function() {
        var mv,
          _this = this;
        mv = new MapView();
        this.$el.prepend(mv.render().el);
        dojo.ready(function() {
          mv.on("mapLoaded", function(map, layers) {
            var opView;
            _this.map = map;
            opView = new OperationalView(layers);
            $('#layertoc').append(opView.render().el);
            return _this.map.resize();
          });
          return mv.ready();
        });
        return this;
      }
    });
  });

}).call(this);
