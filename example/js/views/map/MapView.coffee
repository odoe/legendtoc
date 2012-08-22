define [
  'jquery'
  'underscore'
  'backbone'
  'helpers/extentfactory'
  'esri/layers/osm'
  'esri/dijit/BasemapGallery'
], ($, _, Backbone, extents) ->
  MapView = Backbone.View.extend
    tagName: 'div'
    id: 'map'
    className: 'claro'

    initialize: ->

    render: ->
      @

    ready: ->
      operational = []
      map = new esri.Map @.id,
        extent: extents.demo()
        sliderStyle: 'small'

      $(window).resize ->
        map.resize()

      dojo.connect map, "onLayersAddResult", (results) =>
        @trigger "mapLoaded", map, operational

      osm = new esri.layers.OpenStreetMapLayer()

      demo = new esri.layers.ArcGISDynamicMapServiceLayer "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_LandRecords_Louisville/MapServer"
      demo.title = "Louisville"

      safety = new esri.layers.ArcGISDynamicMapServiceLayer "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Louisville/LOJIC_PublicSafety_Louisville/MapServer"
      safety.title = "Public Safety"

      ###
      # OSM doesn't have a Legend endpoint, so leave it out
      ###
      operational = [demo, safety]

      map.addLayers [osm, demo, safety]
