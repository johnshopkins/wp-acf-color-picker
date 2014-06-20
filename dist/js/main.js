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
  
  // repeaters default subfields to no value, so we need
  // to set a default value of a stringified empty array.
  var value = this.dataField.val() || JSON.stringify({});

  // holds the HTML of the selected color so that it can be
  // placed back in this.displayField after `blur` event if
  // a new color was not selected
  this.currentValue = JSON.parse(value);

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

  this.displayField.html(this.createColor(this.currentValue));

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

  this.createColor({}).appendTo(container);

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

  var swatchColor = color.hex ? "#" + color.hex : "transparet";

  $("<div>")
    .addClass("swatch")
    .css("background-color", swatchColor)
    .appendTo(div);
  
  var colorName = color.name ? color.name : "None";

  $("<span>")
    .html(colorName)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9ub2RlX21vZHVsZXMvZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9zcmMvYXNzZXRzL2pzL2Zha2VfY2YyMjUwOWIuanMiLCIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9zcmMvYXNzZXRzL2pzL2xpYi9jb2xvcnBpY2tlci5qcyIsIi9Vc2Vycy9qd2FjaHRlci93d3cvamh1L3B1YmxpYy9hc3NldHMvcGx1Z2lucy93cC1hY2YtY29sb3ItcGlja2VyL3NyYy9hc3NldHMvanMvc2hpbXMvanF1ZXJ5LmpzIiwiL1VzZXJzL2p3YWNodGVyL3d3dy9qaHUvcHVibGljL2Fzc2V0cy9wbHVnaW5zL3dwLWFjZi1jb2xvci1waWNrZXIvc3JjL2Fzc2V0cy9qcy9zaGltcy91bmRlcnNjb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBnbG9iYWwgcmVxdWlyZTogZmFsc2UgKi9cbi8qIGdsb2JhbCBKU09OOiB0cnVlICovXG5cbnZhciBDb2xvclBpY2tlciA9IHJlcXVpcmUoXCIuL2xpYi9jb2xvcnBpY2tlclwiKTtcblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoJCkge1xuXG4gIHZhciBnZXRDb2xvcnMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29sb3JzID0gJChcIiNqaHVfY29sb3JzXCIpO1xuICAgIGlmIChjb2xvcnMubGVuZ3RoID09PSAwKSByZXR1cm4gW107XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoY29sb3JzLnRleHQoKSk7XG4gIH07XG4gIFxuICAkKGRvY3VtZW50KS5vbihcImFjZi9zZXR1cF9maWVsZHNcIiwgZnVuY3Rpb24gKGUsIG5ld19maWVsZCkge1xuXG4gICAgdmFyIGNvbG9ycyA9IGdldENvbG9ycygpO1xuXG4gICAgJChuZXdfZmllbGQpLmZpbmQoXCJpbnB1dC5qaHVfY29sb3JfcGlja2VyXCIpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICBuZXcgQ29sb3JQaWNrZXIoJCh0aGlzKSwgY29sb3JzKTtcbiAgICB9KTtcblxuICB9KTtcblxufSk7XG4iLCIvKiBnbG9iYWwgcmVxdWlyZTogZmFsc2UgKi9cbi8qIGdsb2JhbCBKU09OOiB0cnVlICovXG5cbnZhciAkID0gcmVxdWlyZShcIi4uL3NoaW1zL2pxdWVyeVwiKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vc2hpbXMvdW5kZXJzY29yZScpO1xuXG52YXIgQ29sb3JQaWNrZXIgPSBmdW5jdGlvbiAoaW5wdXQsIGNvbG9ycykge1xuICAgIFxuICB0aGlzLmlucHV0ID0gaW5wdXQ7XG4gIHRoaXMuY29sb3JzID0gY29sb3JzO1xuXG4gIHZhciBwYXJlbnQgPSB0aGlzLmlucHV0LnBhcmVudHMoXCIuamh1X2NvbG9yX3BpY2tlcl9jb250YWluZXJcIik7XG5cbiAgLy8gaGlkZGVuIGZpZWxkIHRoYXQgaG9sZHMgdGhlIGhleCB2YWx1ZVxuICB0aGlzLmRhdGFGaWVsZCA9IHBhcmVudC5maW5kKFwiLmpodV9jb2xvcl9waWNrZXItaGlkZGVuXCIpO1xuXG4gIC8vIGRpdiB0aGF0IGRpc3BsYXlzIHRoZSBzZWxlY3RlZCBjb2xvclxuICB0aGlzLmRpc3BsYXlGaWVsZCA9IHBhcmVudC5maW5kKFwiLmNvbG9yLWRpc3BsYXlcIik7XG5cbiAgLy8gZGl2IHRoYXQgY29udGFpbnMgdGhlIGNvbG9ycyB0byBjaG9vc2UgZnJvbVxuICB0aGlzLmNvbG9yU2VsZWN0Qm94ID0gcGFyZW50LmZpbmQoXCIuY29sb3JzXCIpO1xuICBcbiAgLy8gcmVwZWF0ZXJzIGRlZmF1bHQgc3ViZmllbGRzIHRvIG5vIHZhbHVlLCBzbyB3ZSBuZWVkXG4gIC8vIHRvIHNldCBhIGRlZmF1bHQgdmFsdWUgb2YgYSBzdHJpbmdpZmllZCBlbXB0eSBhcnJheS5cbiAgdmFyIHZhbHVlID0gdGhpcy5kYXRhRmllbGQudmFsKCkgfHwgSlNPTi5zdHJpbmdpZnkoe30pO1xuXG4gIC8vIGhvbGRzIHRoZSBIVE1MIG9mIHRoZSBzZWxlY3RlZCBjb2xvciBzbyB0aGF0IGl0IGNhbiBiZVxuICAvLyBwbGFjZWQgYmFjayBpbiB0aGlzLmRpc3BsYXlGaWVsZCBhZnRlciBgYmx1cmAgZXZlbnQgaWZcbiAgLy8gYSBuZXcgY29sb3Igd2FzIG5vdCBzZWxlY3RlZFxuICB0aGlzLmN1cnJlbnRWYWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpO1xuXG4gIC8vIGtlZXAgdHJhY2sgb2Ygd2hldGhlciB0aGUgaW5wdXQgaXMgaW4gZm9jdXMgb3Igbm90XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG5cbiAgdGhpcy5zZXR1cERpc3BsYXlGaWVsZCgpO1xuICB0aGlzLnNldHVwY29sb3JTZWxlY3RCb3goKTtcbiAgdGhpcy5zZXR1cEV2ZW50cygpO1xuXG59O1xuXG5Db2xvclBpY2tlci5wcm90b3R5cGUuc2V0dXBEaXNwbGF5RmllbGQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdGhpcy5kaXNwbGF5RmllbGRcbiAgICAuaGVpZ2h0KHRoaXMuaW5wdXQub3V0ZXJIZWlnaHQoKSlcbiAgICAud2lkdGgodGhpcy5pbnB1dC5vdXRlcldpZHRoKCkpO1xuICAgIFxuICB0aGlzLmRpc3BsYXlDdXJyZW50VmFsdWUoKTtcblxufTtcblxuQ29sb3JQaWNrZXIucHJvdG90eXBlLmNsZWFyRGlzcGxheUZpZWxkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmRpc3BsYXlGaWVsZC5odG1sKFwiXCIpO1xufTtcblxuQ29sb3JQaWNrZXIucHJvdG90eXBlLmRpc3BsYXlDdXJyZW50VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdGhpcy5kaXNwbGF5RmllbGQuaHRtbCh0aGlzLmNyZWF0ZUNvbG9yKHRoaXMuY3VycmVudFZhbHVlKSk7XG5cbn07XG5cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5zZXR1cGNvbG9yU2VsZWN0Qm94ID0gZnVuY3Rpb24gKCkge1xuICBcbiAgdGhpcy5wb3B1bGF0ZUNvbG9ycygpO1xuXG4gIHRoaXMuY29sb3JTZWxlY3RCb3hcbiAgICAuY3NzKFwidG9wXCIsICh0aGlzLmlucHV0Lm91dGVySGVpZ2h0KCkgLSAxKSArICdweCcpXG4gICAgLndpZHRoKHRoaXMuaW5wdXQub3V0ZXJXaWR0aCgpIC0gMik7XG5cbn07XG5cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5wb3B1bGF0ZUNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcblxuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBjb250YWluZXIgPSAkKFwiPGRpdj5cIik7XG5cbiAgdGhpcy5jcmVhdGVDb2xvcih7fSkuYXBwZW5kVG8oY29udGFpbmVyKTtcblxuICBfLmVhY2godGhpcy5jb2xvcnMsIGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHNlbGYuY3JlYXRlQ29sb3IoY29sb3IpLmFwcGVuZFRvKGNvbnRhaW5lcik7XG4gIH0pO1xuICBcbiAgdGhpcy5jb2xvclNlbGVjdEJveC5odG1sKGNvbnRhaW5lcik7XG5cbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgZ2l2ZW4gY29sb3IncyBIVE1MLlxuICogQHBhcmFtICBvYmplY3QgY29sb3IgQ29sb3Igb2JqZWN0XG4gKiBAcmV0dXJuIG9iamVjdCAgICAgICBET00gb2JqZWN0XG4gKi9cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5jcmVhdGVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuXG4gIHZhciBkaXYgPSAkKFwiPGRpdj5cIilcbiAgICAuYWRkQ2xhc3MoXCJjb2xvclwiKVxuICAgIC5hdHRyKFwiZGF0YS1pbmZvXCIsIEpTT04uc3RyaW5naWZ5KGNvbG9yKSk7XG5cbiAgdmFyIHN3YXRjaENvbG9yID0gY29sb3IuaGV4ID8gXCIjXCIgKyBjb2xvci5oZXggOiBcInRyYW5zcGFyZXRcIjtcblxuICAkKFwiPGRpdj5cIilcbiAgICAuYWRkQ2xhc3MoXCJzd2F0Y2hcIilcbiAgICAuY3NzKFwiYmFja2dyb3VuZC1jb2xvclwiLCBzd2F0Y2hDb2xvcilcbiAgICAuYXBwZW5kVG8oZGl2KTtcbiAgXG4gIHZhciBjb2xvck5hbWUgPSBjb2xvci5uYW1lID8gY29sb3IubmFtZSA6IFwiTm9uZVwiO1xuXG4gICQoXCI8c3Bhbj5cIilcbiAgICAuaHRtbChjb2xvck5hbWUpXG4gICAgLmFwcGVuZFRvKGRpdik7XG5cbiAgcmV0dXJuIGRpdjtcblxufTtcblxuQ29sb3JQaWNrZXIucHJvdG90eXBlLnNldHVwRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLmlucHV0Lm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuYWN0aXZlID0gdHJ1ZTtcbiAgICBzZWxmLmNsZWFyRGlzcGxheUZpZWxkKCk7XG4gICAgc2VsZi5jb2xvclNlbGVjdEJveC5zaG93KCk7XG4gIH0pO1xuXG4gIHRoaXMuaW5wdXQub24oXCJibHVyXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5hY3RpdmUgPSBmYWxzZTtcbiAgICBzZWxmLmNvbG9yU2VsZWN0Qm94LmhpZGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEhhdmUgdG8gdXNlIHRoZSBtb3VzZWRvd24gZXZlbnQgdG8gZmluZCBvdXQgd2hpY2hcbiAgICogY29sb3Igd2FzIGNob3NlbiBiZWNhdXNlIGNsaWNrIGV2ZW50cyBkbyBub3QgcmVnaXN0ZXJcbiAgICogb24gdGhlIGNvbG9ycy4gT25seSB0aGUgaW5wdXQncyBibHVyIHJlZ2lzdGVycy5cbiAgICovXG4gICQoZG9jdW1lbnQpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAvLyB0cmlnZ2VyIGlucHV0IHdhc24ndCBpbiBmb2N1cywgcmV0dXJuXG4gICAgaWYgKCFzZWxmLmFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgdmFyIGNvbG9yID0gc2VsZi5maW5kQ2xpY2tlZENvbG9yKGUpO1xuICAgIFxuICAgIGlmICghY29sb3IpIHJldHVybiBzZWxmLmRpc3BsYXlDdXJyZW50VmFsdWUoKTtcbiAgICBcbiAgICB2YXIgY29sb3JEYXRhID0gY29sb3IuZGF0YShcImluZm9cIik7XG5cbiAgICAvLyBzYXZlIGNvbG9yIGFzIGN1cnJlbnQgdmFsdWVcbiAgICBzZWxmLmN1cnJlbnRWYWx1ZSA9IGNvbG9yRGF0YTtcblxuICAgIC8vIHNhdmUgZGF0YSB0byBoaWRkZW4gZmllbGRcbiAgICBzZWxmLmRhdGFGaWVsZC5hdHRyKFwidmFsdWVcIiwgSlNPTi5zdHJpbmdpZnkoY29sb3JEYXRhKSk7XG5cbiAgICAvLyBkaXNwbGF5IHRoZSBjb2xvclxuICAgIHNlbGYuZGlzcGxheUZpZWxkLmh0bWwoY29sb3IuaHRtbCgpKTtcblxuICB9KTtcblxufTtcblxuLyoqXG4gKiBGaW5kIHRoZSBjb2xvciBET00gb2JqZWN0IGNsaWNrZWQgb24gZnJvbSBhbiBldmVudCBvYmplY2N0LlxuICogQHBhcmFtICBPYmplY3QgZSBFdmVudFxuICogQHJldHVybiBPYmplY3QgQ29sb3IgRE9NIG9iamVjdFxuICovXG5Db2xvclBpY2tlci5wcm90b3R5cGUuZmluZENsaWNrZWRDb2xvciA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgdmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xuICB2YXIgY29sb3JQYXJlbnQgPSB0YXJnZXQucGFyZW50cyhcIi5jb2xvclwiKTtcblxuICB2YXIgY29sb3I7XG5cbiAgaWYgKHRhcmdldC5oYXNDbGFzcyhcImNvbG9yXCIpKSB7XG4gICAgY29sb3IgPSB0YXJnZXQ7XG4gIH0gZWxzZSBpZiAoY29sb3JQYXJlbnQubGVuZ3RoKSB7XG4gICAgY29sb3IgPSBjb2xvclBhcmVudDtcbiAgfVxuXG4gIHJldHVybiBjb2xvcjtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvclBpY2tlcjtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qIGdsb2JhbCBtb2R1bGUgPSBmYWxzZSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5qUXVlcnk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLyogZ2xvYmFsIG1vZHVsZSA9IGZhbHNlICovXG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLl87XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIl19
