/* global require: false */
/* global JSON: true */

var ColorPicker = require("./lib/colorpicker");

jQuery(document).ready(function ($) {

  var getColors = function() {
    var colors = $("#jhu_colors");
    if (colors.length === 0) return [];
    return JSON.parse(colors.text());
  };

  acf.add_action("load_field/type=jhu_color_picker", function (new_field) {

    var colors = getColors();

    $(new_field).find("input.jhu_color_picker").each(function() {
      new ColorPicker($(this), colors);
    });

  });

});
