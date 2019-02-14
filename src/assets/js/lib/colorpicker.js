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
    self.displayField.html('<div class="color">' + color.addBack().html() + '</div>');

    // trigger onchange to trigger saving of data
    self.input.trigger('change');

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
