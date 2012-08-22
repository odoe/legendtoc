(function() {

  define(['jquery', 'underscore', 'backbone', 'views/tools/layertoc/operationalitem'], function($, _, Backbone, OperationalItem) {
    var OperationalView;
    return OperationalView = Backbone.View.extend({
      id: 'menu-operational',
      tagName: 'ul',
      className: 'dropdown-menu clearfix',
      initialize: function(layers) {
        this.layers = layers;
      },
      render: function() {
        var _this = this;
        this.$el.empty();
        dojo.forEach(this.layers, function(layer) {
          var item;
          item = new OperationalItem(layer);
          return _this.$el.append(item.render().el);
        });
        return this;
      }
    });
  });

}).call(this);
