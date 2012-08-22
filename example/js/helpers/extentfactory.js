(function() {

  define(function() {
    return {
      demo: function() {
        return new esri.geometry.Extent({
          xmin: -9579050.49,
          ymin: 4589431.89,
          xmax: -9510257.16,
          ymax: 4635294.11,
          spatialReference: {
            wkid: 102113
          }
        });
      }
    };
  });

}).call(this);
