define [
  'jquery'
  'underscore'
  'backbone'
  'views/tools/legendtoc/operationalitemsubview'
], ($, _, Backbone, SubView) ->
  OperationalItem = Backbone.View.extend
    tagName: 'li'
    initialize: (@layer) ->

    events:
      "click a[class*='lyr']": 'onItemClicked'
    ###
    # This HTML is really simple, so no need to use text! to bring in a template
    ###
    render: ->
      content = "<a href='#' class='lyr_#{@layer.id} sub-menu'><span class='icon-ok'></span> #{@layer.title}</a><ul class='dropdown-menu'></ul>"
      @$el.append content
      ###
      # This control the opacity of checkmarks.
      # Don't want to hide, so that dom widths/heights of elements don't change.
      ###
      @$el.find('.icon-ok').css("opacity", "#{if @layer.visible then 1 else 0}").css "filter", "alpha(opacity=#{if @layer.visible then 100 else 0})"
      dojo.forEach @layer.layerInfos, (layerInfo) =>
        subview = new SubView @layer, layerInfo
        @$el.find('ul').append subview.render().el

      @

    onItemClicked: (evt) ->
      evt.preventDefault()
      ###
      # This will toggle the visibility of the layer and the check mark
      ###
      @layer.setVisibility not @layer.visible
      @$el.find('.icon-ok:first').css("opacity", "#{if @layer.visible then 1 else 0}").css "filter", "alpha(opacity=#{if @layer.visible then 100 else 0})"
