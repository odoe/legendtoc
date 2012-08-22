(function() {

  define(['jquery', 'underscore', 'backbone', 'helpers/extentfactory', 'esri/layers/osm', 'esri/dijit/BasemapGallery'], function($, _, Backbone, extents) {
    var MapView;
    return MapView = Backbone.View.extend({
      tagName: 'div',
      id: 'map',
      className: 'claro',
      initialize: function() {},
      render: function() {
        return this;
      },
      ready: function() {
        var demo, map, operational, osm, safety,
          _this = this;
        operational = [];
        map = new esri.Map(this.id, {
          extent: extents.demo(),
          sliderStyle: 'small'
        });
        $(window).resize(function() {
          return map.resize();
        });
        dojo.connect(map, "onLayersAddResult", function(results) {
          return _this.trigger("mapLoaded", map, operational);
        });
        osm = new esri.layers.OpenStreetMapLayer();
        demo = new esri.layers.ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer");
        demo.title = "Louisville";
        safety = new esri.layers.ArcGISDynamicMapServiceLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_PublicSafety_Louisville/MapServer");
        safety.title = "Public Safety";
        /*
              # OSM doesn't have a Legend endpoint, so leave it out
        */
        operational = [demo, safety];
        return map.addLayers([osm, demo, safety]);
      }
    });
  });

}).call(this);
