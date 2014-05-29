(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global require: false */
/* global JSON: true */

var ColorPicker = require("./lib/colorpicker");

jQuery(document).ready(function ($) {

  var getColors = function() {
    var colors = $("#jhu_colors");
    if (colors.length === 0) return [];
    return JSON.parse(colors.text());
  };
  
  $(document).on("acf/setup_fields", function (e, new_field) {

    var colors = getColors();

    $(new_field).find("input.jhu_color_picker").each(function() {
      new ColorPicker($(this), colors);
    });

  });

});

},{"./lib/colorpicker":2}],2:[function(require,module,exports){
/* global require: false */
/* global JSON: true */

var $ = require("../shims/jquery");
var _ = require('../shims/underscore');

var ColorPicker = function (input, colors) {
    
  this.input = input;
  this.colors = colors;

  var parent = this.input.parents(".jhu_color_picker_container");

  // hidden field that holds the hex value
  this.dataField = parent.find(".jhu_color_picker-hidden");

  // div that displays the selected color
  this.displayField = parent.find(".color-display");

  // div that contains the colors to choose from
  this.colorSelectBox = parent.find(".colors");

  // holds the HTML of the selected color so that it can be
  // placed back in this.displayField after `blur` event if
  // a new color was not selected
  this.currentValue = JSON.parse(this.dataField.attr("value"));

  // keep track of whether the input is in focus or not
  this.active = false;

  this.setupDisplayField();
  this.setupcolorSelectBox();
  this.setupEvents();

};

ColorPicker.prototype.setupDisplayField = function () {

  this.displayField
    .height(this.input.outerHeight())
    .width(this.input.outerWidth());
    
  this.displayCurrentValue();

};

ColorPicker.prototype.clearDisplayField = function () {
  this.displayField.html("");
};

ColorPicker.prototype.displayCurrentValue = function () {

  if (this.currentValue.hex) {
    this.displayField.html(this.createColor(this.currentValue));
  }

};

ColorPicker.prototype.setupcolorSelectBox = function () {
  
  this.populateColors();

  this.colorSelectBox
    .css("top", (this.input.outerHeight() - 1) + 'px')
    .width(this.input.outerWidth() - 2);

};

ColorPicker.prototype.populateColors = function () {

  var self = this;
  var container = $("<div>");

  _.each(this.colors, function (color) {
    self.createColor(color).appendTo(container);
  });

  this.colorSelectBox.html(container);

};

/**
 * Create a given color's HTML.
 * @param  object color Color object
 * @return object       DOM object
 */
ColorPicker.prototype.createColor = function (color) {

  var div = $("<div>")
    .addClass("color")
    .attr("data-info", JSON.stringify(color));

  $("<div>")
    .addClass("swatch")
    .css("background-color", "#" + color.hex)
    .appendTo(div);

  $("<span>")
    .html(color.name)
    .appendTo(div);

  return div;

};

ColorPicker.prototype.setupEvents = function () {

  var self = this;

  this.input.on("focus", function () {
    self.active = true;
    self.clearDisplayField();
    self.colorSelectBox.show();
  });

  this.input.on("blur", function (e) {
    self.active = false;
    self.colorSelectBox.hide();
  });

  /**
   * Have to use the mousedown event to find out which
   * color was chosen because click events do not register
   * on the colors. Only the input's blur registers.
   */
  $(document).on("mousedown", function (e) {

    // trigger input wasn't in focus, return
    if (!self.active) return;

    var color = self.findClickedColor(e);
    
    if (!color) return self.displayCurrentValue();
    
    var colorData = color.data("info");

    // save color as current value
    self.currentValue = colorData;

    // save data to hidden field
    self.dataField.attr("value", JSON.stringify(colorData));

    // display the color
    self.displayField.html(color.html());

  });

};

/**
 * Find the color DOM object clicked on from an event objecct.
 * @param  Object e Event
 * @return Object Color DOM object
 */
ColorPicker.prototype.findClickedColor = function (e) {

  var target = $(e.target);
  var colorParent = target.parents(".color");

  var color;

  if (target.hasClass("color")) {
    color = target;
  } else if (colorParent.length) {
    color = colorParent;
  }

  return color;

};

module.exports = ColorPicker;

},{"../shims/jquery":3,"../shims/underscore":4}],3:[function(require,module,exports){
(function (global){
/* global module = false */

module.exports = global.jQuery;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
/* global module = false */

module.exports = global._;

}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9ub2RlX21vZHVsZXMvZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9zcmMvYXNzZXRzL2pzL2Zha2VfMjAxMDA0MmQuanMiLCIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9zcmMvYXNzZXRzL2pzL2xpYi9jb2xvcnBpY2tlci5qcyIsIi9Vc2Vycy9qd2FjaHRlci93d3cvamh1L3B1YmxpYy9hc3NldHMvcGx1Z2lucy93cC1hY2YtY29sb3ItcGlja2VyL3NyYy9hc3NldHMvanMvc2hpbXMvanF1ZXJ5LmpzIiwiL1VzZXJzL2p3YWNodGVyL3d3dy9qaHUvcHVibGljL2Fzc2V0cy9wbHVnaW5zL3dwLWFjZi1jb2xvci1waWNrZXIvc3JjL2Fzc2V0cy9qcy9zaGltcy91bmRlcnNjb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCByZXF1aXJlOiBmYWxzZSAqL1xuLyogZ2xvYmFsIEpTT046IHRydWUgKi9cblxudmFyIENvbG9yUGlja2VyID0gcmVxdWlyZShcIi4vbGliL2NvbG9ycGlja2VyXCIpO1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgkKSB7XG5cbiAgdmFyIGdldENvbG9ycyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb2xvcnMgPSAkKFwiI2podV9jb2xvcnNcIik7XG4gICAgaWYgKGNvbG9ycy5sZW5ndGggPT09IDApIHJldHVybiBbXTtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShjb2xvcnMudGV4dCgpKTtcbiAgfTtcbiAgXG4gICQoZG9jdW1lbnQpLm9uKFwiYWNmL3NldHVwX2ZpZWxkc1wiLCBmdW5jdGlvbiAoZSwgbmV3X2ZpZWxkKSB7XG5cbiAgICB2YXIgY29sb3JzID0gZ2V0Q29sb3JzKCk7XG5cbiAgICAkKG5ld19maWVsZCkuZmluZChcImlucHV0LmpodV9jb2xvcl9waWNrZXJcIikuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIG5ldyBDb2xvclBpY2tlcigkKHRoaXMpLCBjb2xvcnMpO1xuICAgIH0pO1xuXG4gIH0pO1xuXG59KTtcbiIsIi8qIGdsb2JhbCByZXF1aXJlOiBmYWxzZSAqL1xuLyogZ2xvYmFsIEpTT046IHRydWUgKi9cblxudmFyICQgPSByZXF1aXJlKFwiLi4vc2hpbXMvanF1ZXJ5XCIpO1xudmFyIF8gPSByZXF1aXJlKCcuLi9zaGltcy91bmRlcnNjb3JlJyk7XG5cbnZhciBDb2xvclBpY2tlciA9IGZ1bmN0aW9uIChpbnB1dCwgY29sb3JzKSB7XG4gICAgXG4gIHRoaXMuaW5wdXQgPSBpbnB1dDtcbiAgdGhpcy5jb2xvcnMgPSBjb2xvcnM7XG5cbiAgdmFyIHBhcmVudCA9IHRoaXMuaW5wdXQucGFyZW50cyhcIi5qaHVfY29sb3JfcGlja2VyX2NvbnRhaW5lclwiKTtcblxuICAvLyBoaWRkZW4gZmllbGQgdGhhdCBob2xkcyB0aGUgaGV4IHZhbHVlXG4gIHRoaXMuZGF0YUZpZWxkID0gcGFyZW50LmZpbmQoXCIuamh1X2NvbG9yX3BpY2tlci1oaWRkZW5cIik7XG5cbiAgLy8gZGl2IHRoYXQgZGlzcGxheXMgdGhlIHNlbGVjdGVkIGNvbG9yXG4gIHRoaXMuZGlzcGxheUZpZWxkID0gcGFyZW50LmZpbmQoXCIuY29sb3ItZGlzcGxheVwiKTtcblxuICAvLyBkaXYgdGhhdCBjb250YWlucyB0aGUgY29sb3JzIHRvIGNob29zZSBmcm9tXG4gIHRoaXMuY29sb3JTZWxlY3RCb3ggPSBwYXJlbnQuZmluZChcIi5jb2xvcnNcIik7XG5cbiAgLy8gaG9sZHMgdGhlIEhUTUwgb2YgdGhlIHNlbGVjdGVkIGNvbG9yIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIHBsYWNlZCBiYWNrIGluIHRoaXMuZGlzcGxheUZpZWxkIGFmdGVyIGBibHVyYCBldmVudCBpZlxuICAvLyBhIG5ldyBjb2xvciB3YXMgbm90IHNlbGVjdGVkXG4gIHRoaXMuY3VycmVudFZhbHVlID0gSlNPTi5wYXJzZSh0aGlzLmRhdGFGaWVsZC5hdHRyKFwidmFsdWVcIikpO1xuXG4gIC8vIGtlZXAgdHJhY2sgb2Ygd2hldGhlciB0aGUgaW5wdXQgaXMgaW4gZm9jdXMgb3Igbm90XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgdGhpcy5zZXR1cERpc3BsYXlGaWVsZCgpO1xuICB0aGlzLnNldHVwY29sb3JTZWxlY3RCb3goKTtcbiAgdGhpcy5zZXR1cEV2ZW50cygpO1xuXG59O1xuXG5Db2xvclBpY2tlci5wcm90b3R5cGUuc2V0dXBEaXNwbGF5RmllbGQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdGhpcy5kaXNwbGF5RmllbGRcbiAgICAuaGVpZ2h0KHRoaXMuaW5wdXQub3V0ZXJIZWlnaHQoKSlcbiAgICAud2lkdGgodGhpcy5pbnB1dC5vdXRlcldpZHRoKCkpO1xuICAgIFxuICB0aGlzLmRpc3BsYXlDdXJyZW50VmFsdWUoKTtcblxufTtcblxuQ29sb3JQaWNrZXIucHJvdG90eXBlLmNsZWFyRGlzcGxheUZpZWxkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmRpc3BsYXlGaWVsZC5odG1sKFwiXCIpO1xufTtcblxuQ29sb3JQaWNrZXIucHJvdG90eXBlLmRpc3BsYXlDdXJyZW50VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgaWYgKHRoaXMuY3VycmVudFZhbHVlLmhleCkge1xuICAgIHRoaXMuZGlzcGxheUZpZWxkLmh0bWwodGhpcy5jcmVhdGVDb2xvcih0aGlzLmN1cnJlbnRWYWx1ZSkpO1xuICB9XG5cbn07XG5cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5zZXR1cGNvbG9yU2VsZWN0Qm94ID0gZnVuY3Rpb24gKCkge1xuICBcbiAgdGhpcy5wb3B1bGF0ZUNvbG9ycygpO1xuXG4gIHRoaXMuY29sb3JTZWxlY3RCb3hcbiAgICAuY3NzKFwidG9wXCIsICh0aGlzLmlucHV0Lm91dGVySGVpZ2h0KCkgLSAxKSArICdweCcpXG4gICAgLndpZHRoKHRoaXMuaW5wdXQub3V0ZXJXaWR0aCgpIC0gMik7XG5cbn07XG5cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5wb3B1bGF0ZUNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBjb250YWluZXIgPSAkKFwiPGRpdj5cIik7XG5cbiAgXy5lYWNoKHRoaXMuY29sb3JzLCBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICBzZWxmLmNyZWF0ZUNvbG9yKGNvbG9yKS5hcHBlbmRUbyhjb250YWluZXIpO1xuICB9KTtcblxuICB0aGlzLmNvbG9yU2VsZWN0Qm94Lmh0bWwoY29udGFpbmVyKTtcblxufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBnaXZlbiBjb2xvcidzIEhUTUwuXG4gKiBAcGFyYW0gIG9iamVjdCBjb2xvciBDb2xvciBvYmplY3RcbiAqIEByZXR1cm4gb2JqZWN0ICAgICAgIERPTSBvYmplY3RcbiAqL1xuQ29sb3JQaWNrZXIucHJvdG90eXBlLmNyZWF0ZUNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XG5cbiAgdmFyIGRpdiA9ICQoXCI8ZGl2PlwiKVxuICAgIC5hZGRDbGFzcyhcImNvbG9yXCIpXG4gICAgLmF0dHIoXCJkYXRhLWluZm9cIiwgSlNPTi5zdHJpbmdpZnkoY29sb3IpKTtcblxuICAkKFwiPGRpdj5cIilcbiAgICAuYWRkQ2xhc3MoXCJzd2F0Y2hcIilcbiAgICAuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNcIiArIGNvbG9yLmhleClcbiAgICAuYXBwZW5kVG8oZGl2KTtcblxuICAkKFwiPHNwYW4+XCIpXG4gICAgLmh0bWwoY29sb3IubmFtZSlcbiAgICAuYXBwZW5kVG8oZGl2KTtcblxuICByZXR1cm4gZGl2O1xuXG59O1xuXG5Db2xvclBpY2tlci5wcm90b3R5cGUuc2V0dXBFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMuaW5wdXQub24oXCJmb2N1c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5hY3RpdmUgPSB0cnVlO1xuICAgIHNlbGYuY2xlYXJEaXNwbGF5RmllbGQoKTtcbiAgICBzZWxmLmNvbG9yU2VsZWN0Qm94LnNob3coKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnB1dC5vbihcImJsdXJcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHNlbGYuY29sb3JTZWxlY3RCb3guaGlkZSgpO1xuICB9KTtcblxuICAvKipcbiAgICogSGF2ZSB0byB1c2UgdGhlIG1vdXNlZG93biBldmVudCB0byBmaW5kIG91dCB3aGljaFxuICAgKiBjb2xvciB3YXMgY2hvc2VuIGJlY2F1c2UgY2xpY2sgZXZlbnRzIGRvIG5vdCByZWdpc3RlclxuICAgKiBvbiB0aGUgY29sb3JzLiBPbmx5IHRoZSBpbnB1dCdzIGJsdXIgcmVnaXN0ZXJzLlxuICAgKi9cbiAgJChkb2N1bWVudCkub24oXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcblxuICAgIC8vIHRyaWdnZXIgaW5wdXQgd2Fzbid0IGluIGZvY3VzLCByZXR1cm5cbiAgICBpZiAoIXNlbGYuYWN0aXZlKSByZXR1cm47XG5cbiAgICB2YXIgY29sb3IgPSBzZWxmLmZpbmRDbGlja2VkQ29sb3IoZSk7XG4gICAgXG4gICAgaWYgKCFjb2xvcikgcmV0dXJuIHNlbGYuZGlzcGxheUN1cnJlbnRWYWx1ZSgpO1xuICAgIFxuICAgIHZhciBjb2xvckRhdGEgPSBjb2xvci5kYXRhKFwiaW5mb1wiKTtcblxuICAgIC8vIHNhdmUgY29sb3IgYXMgY3VycmVudCB2YWx1ZVxuICAgIHNlbGYuY3VycmVudFZhbHVlID0gY29sb3JEYXRhO1xuXG4gICAgLy8gc2F2ZSBkYXRhIHRvIGhpZGRlbiBmaWVsZFxuICAgIHNlbGYuZGF0YUZpZWxkLmF0dHIoXCJ2YWx1ZVwiLCBKU09OLnN0cmluZ2lmeShjb2xvckRhdGEpKTtcblxuICAgIC8vIGRpc3BsYXkgdGhlIGNvbG9yXG4gICAgc2VsZi5kaXNwbGF5RmllbGQuaHRtbChjb2xvci5odG1sKCkpO1xuXG4gIH0pO1xuXG59O1xuXG4vKipcbiAqIEZpbmQgdGhlIGNvbG9yIERPTSBvYmplY3QgY2xpY2tlZCBvbiBmcm9tIGFuIGV2ZW50IG9iamVjY3QuXG4gKiBAcGFyYW0gIE9iamVjdCBlIEV2ZW50XG4gKiBAcmV0dXJuIE9iamVjdCBDb2xvciBET00gb2JqZWN0XG4gKi9cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5maW5kQ2xpY2tlZENvbG9yID0gZnVuY3Rpb24gKGUpIHtcblxuICB2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XG4gIHZhciBjb2xvclBhcmVudCA9IHRhcmdldC5wYXJlbnRzKFwiLmNvbG9yXCIpO1xuXG4gIHZhciBjb2xvcjtcblxuICBpZiAodGFyZ2V0Lmhhc0NsYXNzKFwiY29sb3JcIikpIHtcbiAgICBjb2xvciA9IHRhcmdldDtcbiAgfSBlbHNlIGlmIChjb2xvclBhcmVudC5sZW5ndGgpIHtcbiAgICBjb2xvciA9IGNvbG9yUGFyZW50O1xuICB9XG5cbiAgcmV0dXJuIGNvbG9yO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbG9yUGlja2VyO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLyogZ2xvYmFsIG1vZHVsZSA9IGZhbHNlICovXG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLmpRdWVyeTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4vKiBnbG9iYWwgbW9kdWxlID0gZmFsc2UgKi9cblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuXztcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiXX0=
