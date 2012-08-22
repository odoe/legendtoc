(function() {

  define(['jquery', 'underscore', 'backbone', 'views/tools/layertoc/operationalitemsubview'], function($, _, Backbone, SubView) {
    var OperationalItem;
    return OperationalItem = Backbone.View.extend({
      tagName: 'li',
      initialize: function(layer) {
        this.layer = layer;
      },
      events: {
        "click a[class*='lyr']": 'onItemClicked'
      },
      /*
          # This HTML is really simple, so no need to use text! to bring in a template
      */
      render: function() {
        var content,
          _this = this;
        content = "<a href='#' class='lyr_" + this.layer.id + " sub-menu'><span class='icon-ok'></span> " + this.layer.title + "</a><ul class='dropdown-menu'></ul>";
        this.$el.append(content);
        /*
              # This control the opacity of checkmarks.
              # Don't want to hide, so that dom widths/heights of elements don't change.
        */
        this.$el.find('.icon-ok').css("opacity", "" + (this.layer.visible ? 1 : 0)).css("filter", "alpha(opacity=" + (this.layer.visible ? 100 : 0) + ")");
        dojo.forEach(this.layer.layerInfos, function(layerInfo) {
          var subview;
          subview = new SubView(_this.layer, layerInfo);
          return _this.$el.find('ul').append(subview.render().el);
        });
        return this;
      },
      onItemClicked: function(evt) {
        evt.preventDefault();
        /*
              # This will toggle the visibility of the layer and the check mark
        */
        this.layer.setVisibility(!this.layer.visible);
        return this.$el.find('.icon-ok:first').css("opacity", "" + (this.layer.visible ? 1 : 0)).css("filter", "alpha(opacity=" + (this.layer.visible ? 100 : 0) + ")");
      }
    });
  });

}).call(this);
