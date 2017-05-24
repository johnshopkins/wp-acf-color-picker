<?php
/*
Plugin Name: ColorPicker
Description:
Author: johnshopkins
Version: 0.1
*/

class ColorPickerMain
{
  protected $logger;

  public function __construct($logger)
  {
    $this->logger = $logger;

    add_action('acf/include_field_types', function () {
      new \ColorPicker\Field($this->logger, plugin_dir_url(__FILE__));
    });

    add_action('admin_enqueue_scripts', function ($hook) {

      if ($hook === "post.php" || $hook === "post-new.php") {

        $file = __DIR__ . "/config/colors.json";
        $colors = file_exists($file) ? json_decode(file_get_contents($file)) : array();

        echo "<script type='application/json' id='jhu_colors'>\n";
        echo json_encode($colors);
        echo "\n</script>";
      }

    });
  }
}

new ColorPickerMain($dependencies["logger_wp"]);
