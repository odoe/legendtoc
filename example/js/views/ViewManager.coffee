define [
  'jquery'
  'underscore'
  'backbone'
  'views/map/MapView'
  'views/tools/layerlgnd/operationalview'
  'jqueryui'
  'esri/dijit/Popup'
], ($, _, Backbone, MapView, OperationalView) ->

  ViewManager = Backbone.View.extend
    el: $ '#container-main'

    render: ->
      mv = new MapView()
      @$el.prepend mv.render().el
      dojo.ready =>
        mv.on "mapLoaded", (@map, layers) =>

          opView = new OperationalView layers
          $('#layertoc').append opView.render().el
          @map.resize()

        mv.ready()

      @
