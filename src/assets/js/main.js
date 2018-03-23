/* global require: false */
/* global document: true */
/* global acf: true */

var $ = require("./shims/jquery");
var ColorPicker = require("./lib/colorpicker");
var colors = require("../../../config/colors.json");

$(document).ready(function ($) {

  var setupField = function (field) {

    $(field).find("input.jhu_color_picker").each(function() {
      new ColorPicker($(this), colors);
    });

  };

  acf.add_action("load_field/type=jhu_color_picker", setupField);
  acf.add_action("append_field/type=jhu_color_picker", setupField);

});
