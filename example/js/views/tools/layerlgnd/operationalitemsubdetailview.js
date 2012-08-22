(function() {

  define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var SubLegendItem;
    return SubLegendItem = Backbone.View.extend({
      tagName: 'ul',
      className: 'dropdown-menu',
      events: {
        "click a": "onLegendItemClick"
      },
      initialize: function(legendItems, url, layerId) {
        this.legendItems = legendItems;
        this.url = url;
        this.layerId = layerId;
      },
      render: function() {
        var item, list, _i, _len, _ref;
        list = "";
        /*
              # Append the various legend symbols to the list
        */
        _ref = this.legendItems;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          if (item.label.length < 1) item.label = '...';
          this.$el.append("<li><a href='#'>" + item.label + "<img src='" + this.url + "/" + item.url + "' class='sym-" + this.layerId + "' ></img></a><l/i>");
        }
        return this;
      },
      onLegendItemClick: function(evt) {
        return evt.preventDefault();
      }
    });
  });

}).call(this);
