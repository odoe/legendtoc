define [
  'jquery'
  'underscore'
  'backbone'
  'views/tools/layerlgnd/operationalitem'
], ($, _, Backbone, OperationalItem) ->
  OperationalView = Backbone.View.extend
    id: 'menu-operational'
    tagName: 'ul'
    className: 'dropdown-menu clearfix'

    initialize: (@layers) ->

    render: ->
      @$el.empty()
      dojo.forEach @layers, (layer) =>
        item = new OperationalItem layer
        @$el.append item.render().el
      @
