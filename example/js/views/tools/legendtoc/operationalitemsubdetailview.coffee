define [
  'jquery'
  'underscore'
  'backbone'
], ($, _, Backbone) ->
  SubLegendItem = Backbone.View.extend
    tagName: 'ul'
    className: 'dropdown-menu'

    events:
      "click a" : "onLegendItemClick"

    initialize: (@legendItems, @url, @layerId) ->

    render: ->
      list = ""
      ###
      # Append the various legend symbols to the list
      ###
      for item in @legendItems
        if item.label.length < 1 then item.label = '...'
        @$el.append "<li><a href='#'>#{item.label}<img src='#{@url}/#{item.url}' class='sym-#{@layerId}' ></img></a><l/i>"

      @

    onLegendItemClick: (evt) ->
      evt.preventDefault()
