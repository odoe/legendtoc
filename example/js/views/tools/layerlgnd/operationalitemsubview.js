(function() {

  define(['jquery', 'underscore', 'backbone', 'views/tools/layerlgnd/operationalitemsubdetailview'], function($, _, Backbone, LegendItem) {
    var OperationalItemSubView;
    return OperationalItemSubView = Backbone.View.extend({
      tagName: 'li',
      initialize: function(layer, layerInfo) {
        this.layer = layer;
        this.layerInfo = layerInfo;
      },
      events: {
        'click a.layer-item': 'onSubItemClicked'
      },
      render: function() {
        var request,
          _this = this;
        request = esri.request({
          "url": "" + this.layer.url + "/legend",
          "content": {
            "f": "json"
          },
          "callbackParamName": "callback"
        });
        request.then(function(response, io) {
          var content, lgndView, lyr, lyrs, url, url2, visible;
          lyrs = response.layers;
          /*
                  # Build the URL to the legend item for an element
          */
          url = "" + _this.layer.url + "/" + _this.layerInfo.id + "/images/" + lyrs[_this.layerInfo.id].legend[0].url;
          visible = (function() {
            var _i, _len, _ref, _results;
            _ref = this.layer.visibleLayers;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              lyr = _ref[_i];
              _results.push(lyr);
            }
            return _results;
          }).call(_this);
          content = "";
          /*
                  # Build the anchor element based on whether or not
                  # it has a unique value renderer in the legend array
          */
          if (lyrs[_this.layerInfo.id].legend.length > 1) {
            content = "<a class='layer-item' href='#'><span class='icon-ok'></span> " + _this.layerInfo.name + "</a>";
          } else {
            content = "<a class='layer-item' href='#'><span class='icon-ok'></span> <span>" + _this.layerInfo.name + "<img src='" + url + "' class='sym-" + _this.layerInfo.id + "'></img></span></a>";
          }
          _this.$el.empty().append(content);
          _this.$el.find('.icon-ok').css("opacity", "" + (visible.indexOf(_this.layerInfo.id) > -1 ? 1 : 0)).css("filter", "alpha(opacity=" + (visible.indexOf(_this.layerInfo.id) > -1 ? 100 : 0) + ")");
          if (lyrs[_this.layerInfo.id].legend.length > 1) {
            url2 = "" + _this.layer.url + "/" + _this.layerInfo.id + "/images";
            lgndView = new LegendItem(lyrs[_this.layerInfo.id].legend, url2, _this.layerInfo.id);
            return _this.$el.append(lgndView.render().el);
          }
        });
        return this;
      },
      onSubItemClicked: function(evt) {
        var index, lyr, visible;
        evt.preventDefault();
        /*
              # Toggle the visibility of the checkmarks and the visible layers
        */
        visible = (function() {
          var _i, _len, _ref, _results;
          _ref = this.layer.visibleLayers;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            lyr = _ref[_i];
            _results.push(lyr);
          }
          return _results;
        }).call(this);
        index = visible.indexOf(this.layerInfo.id);
        if (index > -1) {
          visible.splice(index, 1);
        } else {
          visible.push(this.layerInfo.id);
        }
        this.layer.setVisibleLayers(visible.length > 0 ? visible : [-1]);
        return this.$el.find('.icon-ok').css("opacity", "" + (visible.indexOf(this.layerInfo.id) > -1 ? 1 : 0)).css("filter", "alpha(opacity=" + (visible.indexOf(this.layerInfo.id) > -1 ? 100 : 0) + ")");
      }
    });
  });

}).call(this);
