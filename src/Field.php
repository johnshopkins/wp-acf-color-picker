<?php

namespace ColorPicker;

class Field extends \acf_field
{
    public $defaults;

    protected $colors;

    function __construct()
    {
        $this->dir = plugin_dir_url(dirname(__FILE__));
        $this->name = 'jhu_color_picker';
        $this->label = __('JHU Color Picker');
        $this->category = __("Choice",'acf');
        $this->defaults = array();

        parent::__construct();
    }


    function render_field( $field )
    {
        $value = $field["value"];

        echo "<div class='acf-input-wrap jhu_color_picker_container'>";

        echo "<div class='input-container'>";
        echo "<input type='text' class='{$this->name}' autocomplete='off' />";
        echo "<div class='color-display'></div>";
        echo "<input type='hidden' value='{$value}' class='{$this->name}-hidden' id='{$field['id']}' name='{$field['name']}' />";
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
        $value = empty($value) ? new \StdClass() : stripslashes($value);
        return json_decode($value);
    }

    /**
     * This filter is appied to the $value after it is loaded from the
     * database and before it is returned to the template
     */
    function format_value( $value, $post_id, $field )
    {
        return json_decode($value);
    }

    function input_admin_enqueue_scripts()
    {
        wp_enqueue_style('jhu_color_picker_css', $this->dir . 'dist/css/styles.css', array(), '0.0.1');
        wp_enqueue_script('jhu_color_picker', $this->dir . 'dist/js/main.js', array('underscore', 'jquery'), '0.0.1');
    }

}
