<?php

namespace ColorPicker;

class Field extends \acf_field
{   
    public $settings;
    public $defaults;

    protected $colors;
        
    function __construct($logger)
    {
        $this->name = 'jhu_color_picker';
        $this->label = __('JHU Color Picker');
        $this->category = __("Choice",'acf');
        $this->defaults = array();
        
        parent::__construct();

        $file = dirname(__DIR__) . "/config/colors.json";

        $this->settings = array(
            'path' => apply_filters('acf/helpers/get_path', __FILE__),
            'dir' => apply_filters('acf/helpers/get_dir', __FILE__),
            'version' => '1.0.0'
        );

    }
    
    
    function create_field( $field )
    {
        $value = $field["value"];

        echo "<div class='acf-input-wrap jhu_color_picker_container'>";
        
        echo "<div class='input-container'>";
        echo "<input type='text' class='{$field['class']}' autocomplete='off' />";
        echo "<div class='color-display'></div>";
        echo "<input type='hidden' value='{$value}' class='{$field['class']}-hidden' id='{$field['id']}' name='{$field['name']}' />";
        echo "</div>";

        echo "<div class='colors'></div>";
        echo "</div>";
    }

    function load_value( $value, $post_id, $field )
    {
        $value = empty($value) ? new \StdClass() : $value;
        $value = json_encode($value);

        return $value;
    }

    function update_value( $value, $post_id, $field )
    {
        $value = empty($value) ? new \StdClass() : $value;
        return json_decode($value);
    }
    
    function input_admin_enqueue_scripts()
    {
        wp_enqueue_style('jhu_color_picker_css', dirname($this->settings['dir']) . '/dist/css/styles.css', array(), '0.0.1');
        wp_enqueue_script('jhu_color_picker', dirname($this->settings['dir']) . '/dist/js/main.js', array('underscore', 'jquery'), '0.0.1');
    }

}
