define [
  'jquery'
  'underscore'
  'backbone'
  'views/tools/legendtoc/operationalitemsubdetailview'
], ($, _, Backbone, LegendItem) ->
  OperationalItemSubView = Backbone.View.extend
    tagName: 'li'
    initialize: (@layer, @layerInfo) ->

    events:
      'click a.layer-item' : 'onSubItemClicked'

    render: ->
      request = esri.request
        "url": "#{@layer.url}/legend"
        "content": "f":"json"
        "callbackParamName": "callback"

      request.then (response, io) =>
        lyrs = response.layers
        ###
        # Build the URL to the legend item for an element
        ###
        url = "#{@layer.url}/#{@layerInfo.id}/images/#{lyrs[@layerInfo.id].legend[0].url}"

        visible = for lyr in @layer.visibleLayers then lyr
        content = ""
        ###
        # Build the anchor element based on whether or not
        # it has a unique value renderer in the legend array
        ###
        if lyrs[@layerInfo.id].legend.length > 1
          content = "<a class='layer-item' href='#'><span class='icon-ok'></span> #{@layerInfo.name}</a>"
        else
          content = "<a class='layer-item' href='#'><span class='icon-ok'></span> <span>#{@layerInfo.name}<img src='#{url}' class='sym-#{@layerInfo.id}'></img></span></a>"
        @$el.empty().append content
        @$el.find('.icon-ok').css("opacity", "#{if visible.indexOf(@layerInfo.id) > -1 then 1 else 0}").css "filter", "alpha(opacity=#{if visible.indexOf(@layerInfo.id) > -1 then 100 else 0})"

        if lyrs[@layerInfo.id].legend.length > 1
          url2 ="#{@layer.url}/#{@layerInfo.id}/images"
          lgndView = new LegendItem lyrs[@layerInfo.id].legend, url2, @layerInfo.id
          @$el.append lgndView.render().el
      @

    onSubItemClicked: (evt) ->
      evt.preventDefault()
      ###
      # Toggle the visibility of the checkmarks and the visible layers
      ###
      visible = for lyr in @layer.visibleLayers then lyr
      index = visible.indexOf @layerInfo.id
      if index > -1
        visible.splice index, 1
      else
        visible.push @layerInfo.id

      @layer.setVisibleLayers if visible.length > 0 then visible else [-1]
      @$el.find('.icon-ok').css("opacity", "#{if visible.indexOf(@layerInfo.id) > -1 then 1 else 0}").css "filter", "alpha(opacity=#{if visible.indexOf(@layerInfo.id) > -1 then 100 else 0})"
