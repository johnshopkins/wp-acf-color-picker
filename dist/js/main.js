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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9ub2RlX21vZHVsZXMvZ3VscC10YXNrcy9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9zcmMvYXNzZXRzL2pzL2Zha2VfMzU0NWZlYWYuanMiLCIvVXNlcnMvandhY2h0ZXIvd3d3L2podS9wdWJsaWMvYXNzZXRzL3BsdWdpbnMvd3AtYWNmLWNvbG9yLXBpY2tlci9zcmMvYXNzZXRzL2pzL2xpYi9jb2xvcnBpY2tlci5qcyIsIi9Vc2Vycy9qd2FjaHRlci93d3cvamh1L3B1YmxpYy9hc3NldHMvcGx1Z2lucy93cC1hY2YtY29sb3ItcGlja2VyL3NyYy9hc3NldHMvanMvc2hpbXMvanF1ZXJ5LmpzIiwiL1VzZXJzL2p3YWNodGVyL3d3dy9qaHUvcHVibGljL2Fzc2V0cy9wbHVnaW5zL3dwLWFjZi1jb2xvci1waWNrZXIvc3JjL2Fzc2V0cy9qcy9zaGltcy91bmRlcnNjb3JlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIHJlcXVpcmU6IGZhbHNlICovXG4vKiBnbG9iYWwgSlNPTjogdHJ1ZSAqL1xuXG52YXIgQ29sb3JQaWNrZXIgPSByZXF1aXJlKFwiLi9saWIvY29sb3JwaWNrZXJcIik7XG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHtcblxuICB2YXIgZ2V0Q29sb3JzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbG9ycyA9ICQoXCIjamh1X2NvbG9yc1wiKTtcbiAgICBpZiAoY29sb3JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBKU09OLnBhcnNlKGNvbG9ycy50ZXh0KCkpO1xuICB9O1xuICBcbiAgJChkb2N1bWVudCkub24oXCJhY2Yvc2V0dXBfZmllbGRzXCIsIGZ1bmN0aW9uIChlLCBuZXdfZmllbGQpIHtcblxuICAgIHZhciBjb2xvcnMgPSBnZXRDb2xvcnMoKTtcblxuICAgICQobmV3X2ZpZWxkKS5maW5kKFwiaW5wdXQuamh1X2NvbG9yX3BpY2tlclwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgbmV3IENvbG9yUGlja2VyKCQodGhpcyksIGNvbG9ycyk7XG4gICAgfSk7XG5cbiAgfSk7XG5cbn0pO1xuIiwiLyogZ2xvYmFsIHJlcXVpcmU6IGZhbHNlICovXG4vKiBnbG9iYWwgSlNPTjogdHJ1ZSAqL1xuXG52YXIgJCA9IHJlcXVpcmUoXCIuLi9zaGltcy9qcXVlcnlcIik7XG52YXIgXyA9IHJlcXVpcmUoJy4uL3NoaW1zL3VuZGVyc2NvcmUnKTtcblxudmFyIENvbG9yUGlja2VyID0gZnVuY3Rpb24gKGlucHV0LCBjb2xvcnMpIHtcbiAgICBcbiAgdGhpcy5pbnB1dCA9IGlucHV0O1xuICB0aGlzLmNvbG9ycyA9IGNvbG9ycztcblxuICB2YXIgcGFyZW50ID0gdGhpcy5pbnB1dC5wYXJlbnRzKFwiLmpodV9jb2xvcl9waWNrZXJfY29udGFpbmVyXCIpO1xuXG4gIC8vIGhpZGRlbiBmaWVsZCB0aGF0IGhvbGRzIHRoZSBoZXggdmFsdWVcbiAgdGhpcy5kYXRhRmllbGQgPSBwYXJlbnQuZmluZChcIi5qaHVfY29sb3JfcGlja2VyLWhpZGRlblwiKTtcblxuICAvLyBkaXYgdGhhdCBkaXNwbGF5cyB0aGUgc2VsZWN0ZWQgY29sb3JcbiAgdGhpcy5kaXNwbGF5RmllbGQgPSBwYXJlbnQuZmluZChcIi5jb2xvci1kaXNwbGF5XCIpO1xuXG4gIC8vIGRpdiB0aGF0IGNvbnRhaW5zIHRoZSBjb2xvcnMgdG8gY2hvb3NlIGZyb21cbiAgdGhpcy5jb2xvclNlbGVjdEJveCA9IHBhcmVudC5maW5kKFwiLmNvbG9yc1wiKTtcbiAgXG4gIC8vIHJlcGVhdGVycyBkZWZhdWx0IHN1YmZpZWxkcyB0byBubyB2YWx1ZSwgc28gd2UgbmVlZFxuICAvLyB0byBzZXQgYSBkZWZhdWx0IHZhbHVlIG9mIGEgc3RyaW5naWZpZWQgZW1wdHkgYXJyYXkuXG4gIHZhciB2YWx1ZSA9IHRoaXMuZGF0YUZpZWxkLnZhbCgpIHx8IEpTT04uc3RyaW5naWZ5KHt9KTtcblxuICAvLyBob2xkcyB0aGUgSFRNTCBvZiB0aGUgc2VsZWN0ZWQgY29sb3Igc28gdGhhdCBpdCBjYW4gYmVcbiAgLy8gcGxhY2VkIGJhY2sgaW4gdGhpcy5kaXNwbGF5RmllbGQgYWZ0ZXIgYGJsdXJgIGV2ZW50IGlmXG4gIC8vIGEgbmV3IGNvbG9yIHdhcyBub3Qgc2VsZWN0ZWRcbiAgdGhpcy5jdXJyZW50VmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcblxuICAvLyBrZWVwIHRyYWNrIG9mIHdoZXRoZXIgdGhlIGlucHV0IGlzIGluIGZvY3VzIG9yIG5vdFxuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gIHRoaXMuc2V0dXBEaXNwbGF5RmllbGQoKTtcbiAgdGhpcy5zZXR1cGNvbG9yU2VsZWN0Qm94KCk7XG4gIHRoaXMuc2V0dXBFdmVudHMoKTtcblxufTtcblxuQ29sb3JQaWNrZXIucHJvdG90eXBlLnNldHVwRGlzcGxheUZpZWxkID0gZnVuY3Rpb24gKCkge1xuXG4gIHRoaXMuZGlzcGxheUZpZWxkXG4gICAgLmhlaWdodCh0aGlzLmlucHV0Lm91dGVySGVpZ2h0KCkpXG4gICAgLndpZHRoKHRoaXMuaW5wdXQub3V0ZXJXaWR0aCgpKTtcbiAgICBcbiAgdGhpcy5kaXNwbGF5Q3VycmVudFZhbHVlKCk7XG5cbn07XG5cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5jbGVhckRpc3BsYXlGaWVsZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5kaXNwbGF5RmllbGQuaHRtbChcIlwiKTtcbn07XG5cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5kaXNwbGF5Q3VycmVudFZhbHVlID0gZnVuY3Rpb24gKCkge1xuXG4gIGlmICh0aGlzLmN1cnJlbnRWYWx1ZS5oZXgpIHtcbiAgICB0aGlzLmRpc3BsYXlGaWVsZC5odG1sKHRoaXMuY3JlYXRlQ29sb3IodGhpcy5jdXJyZW50VmFsdWUpKTtcbiAgfVxuXG59O1xuXG5Db2xvclBpY2tlci5wcm90b3R5cGUuc2V0dXBjb2xvclNlbGVjdEJveCA9IGZ1bmN0aW9uICgpIHtcbiAgXG4gIHRoaXMucG9wdWxhdGVDb2xvcnMoKTtcblxuICB0aGlzLmNvbG9yU2VsZWN0Qm94XG4gICAgLmNzcyhcInRvcFwiLCAodGhpcy5pbnB1dC5vdXRlckhlaWdodCgpIC0gMSkgKyAncHgnKVxuICAgIC53aWR0aCh0aGlzLmlucHV0Lm91dGVyV2lkdGgoKSAtIDIpO1xuXG59O1xuXG5Db2xvclBpY2tlci5wcm90b3R5cGUucG9wdWxhdGVDb2xvcnMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgY29udGFpbmVyID0gJChcIjxkaXY+XCIpO1xuXG4gIF8uZWFjaCh0aGlzLmNvbG9ycywgZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgc2VsZi5jcmVhdGVDb2xvcihjb2xvcikuYXBwZW5kVG8oY29udGFpbmVyKTtcbiAgfSk7XG5cbiAgdGhpcy5jb2xvclNlbGVjdEJveC5odG1sKGNvbnRhaW5lcik7XG5cbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgZ2l2ZW4gY29sb3IncyBIVE1MLlxuICogQHBhcmFtICBvYmplY3QgY29sb3IgQ29sb3Igb2JqZWN0XG4gKiBAcmV0dXJuIG9iamVjdCAgICAgICBET00gb2JqZWN0XG4gKi9cbkNvbG9yUGlja2VyLnByb3RvdHlwZS5jcmVhdGVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuXG4gIHZhciBkaXYgPSAkKFwiPGRpdj5cIilcbiAgICAuYWRkQ2xhc3MoXCJjb2xvclwiKVxuICAgIC5hdHRyKFwiZGF0YS1pbmZvXCIsIEpTT04uc3RyaW5naWZ5KGNvbG9yKSk7XG5cbiAgJChcIjxkaXY+XCIpXG4gICAgLmFkZENsYXNzKFwic3dhdGNoXCIpXG4gICAgLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCIjXCIgKyBjb2xvci5oZXgpXG4gICAgLmFwcGVuZFRvKGRpdik7XG5cbiAgJChcIjxzcGFuPlwiKVxuICAgIC5odG1sKGNvbG9yLm5hbWUpXG4gICAgLmFwcGVuZFRvKGRpdik7XG5cbiAgcmV0dXJuIGRpdjtcblxufTtcblxuQ29sb3JQaWNrZXIucHJvdG90eXBlLnNldHVwRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLmlucHV0Lm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuYWN0aXZlID0gdHJ1ZTtcbiAgICBzZWxmLmNsZWFyRGlzcGxheUZpZWxkKCk7XG4gICAgc2VsZi5jb2xvclNlbGVjdEJveC5zaG93KCk7XG4gIH0pO1xuXG4gIHRoaXMuaW5wdXQub24oXCJibHVyXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5hY3RpdmUgPSBmYWxzZTtcbiAgICBzZWxmLmNvbG9yU2VsZWN0Qm94LmhpZGUoKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEhhdmUgdG8gdXNlIHRoZSBtb3VzZWRvd24gZXZlbnQgdG8gZmluZCBvdXQgd2hpY2hcbiAgICogY29sb3Igd2FzIGNob3NlbiBiZWNhdXNlIGNsaWNrIGV2ZW50cyBkbyBub3QgcmVnaXN0ZXJcbiAgICogb24gdGhlIGNvbG9ycy4gT25seSB0aGUgaW5wdXQncyBibHVyIHJlZ2lzdGVycy5cbiAgICovXG4gICQoZG9jdW1lbnQpLm9uKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG5cbiAgICAvLyB0cmlnZ2VyIGlucHV0IHdhc24ndCBpbiBmb2N1cywgcmV0dXJuXG4gICAgaWYgKCFzZWxmLmFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgdmFyIGNvbG9yID0gc2VsZi5maW5kQ2xpY2tlZENvbG9yKGUpO1xuICAgIFxuICAgIGlmICghY29sb3IpIHJldHVybiBzZWxmLmRpc3BsYXlDdXJyZW50VmFsdWUoKTtcbiAgICBcbiAgICB2YXIgY29sb3JEYXRhID0gY29sb3IuZGF0YShcImluZm9cIik7XG5cbiAgICAvLyBzYXZlIGNvbG9yIGFzIGN1cnJlbnQgdmFsdWVcbiAgICBzZWxmLmN1cnJlbnRWYWx1ZSA9IGNvbG9yRGF0YTtcblxuICAgIC8vIHNhdmUgZGF0YSB0byBoaWRkZW4gZmllbGRcbiAgICBzZWxmLmRhdGFGaWVsZC5hdHRyKFwidmFsdWVcIiwgSlNPTi5zdHJpbmdpZnkoY29sb3JEYXRhKSk7XG5cbiAgICAvLyBkaXNwbGF5IHRoZSBjb2xvclxuICAgIHNlbGYuZGlzcGxheUZpZWxkLmh0bWwoY29sb3IuaHRtbCgpKTtcblxuICB9KTtcblxufTtcblxuLyoqXG4gKiBGaW5kIHRoZSBjb2xvciBET00gb2JqZWN0IGNsaWNrZWQgb24gZnJvbSBhbiBldmVudCBvYmplY2N0LlxuICogQHBhcmFtICBPYmplY3QgZSBFdmVudFxuICogQHJldHVybiBPYmplY3QgQ29sb3IgRE9NIG9iamVjdFxuICovXG5Db2xvclBpY2tlci5wcm90b3R5cGUuZmluZENsaWNrZWRDb2xvciA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgdmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xuICB2YXIgY29sb3JQYXJlbnQgPSB0YXJnZXQucGFyZW50cyhcIi5jb2xvclwiKTtcblxuICB2YXIgY29sb3I7XG5cbiAgaWYgKHRhcmdldC5oYXNDbGFzcyhcImNvbG9yXCIpKSB7XG4gICAgY29sb3IgPSB0YXJnZXQ7XG4gIH0gZWxzZSBpZiAoY29sb3JQYXJlbnQubGVuZ3RoKSB7XG4gICAgY29sb3IgPSBjb2xvclBhcmVudDtcbiAgfVxuXG4gIHJldHVybiBjb2xvcjtcblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDb2xvclBpY2tlcjtcbiIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qIGdsb2JhbCBtb2R1bGUgPSBmYWxzZSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbC5qUXVlcnk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLyogZ2xvYmFsIG1vZHVsZSA9IGZhbHNlICovXG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsLl87XG5cbn0pLmNhbGwodGhpcyx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pIl19
