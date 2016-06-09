/* global require: false */
/* global JSON: true */

var ColorPicker = require("./lib/colorpicker");

jQuery(document).ready(function ($) {

  var getColors = function() {
    var colors = $("#jhu_colors");
    if (colors.length === 0) return [];
    return JSON.parse(colors.text());
  };

  var setupField = function (field) {

    var colors = getColors();

    $(field).find("input.jhu_color_picker").each(function() {
      new ColorPicker($(this), colors);
    });

  };

  acf.add_action("load_field/type=jhu_color_picker", setupField);
  acf.add_action("append_field/type=jhu_color_picker", setupField);

});
