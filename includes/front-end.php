<?php

function elegant_loader_display_svg()
{
    if (get_option('elegant_loader_svg')) {
        if (isset($_GET['elegant_loader']) && $_GET['elegant_loader'] === 'false') {
            return;
        }

        // Check display settings
        $display_setting = get_option('elegant_loader_display', 'everywhere');

        if ($display_setting === 'specific') {
            $selected_pages = get_option('elegant_loader_pages', array());
            if (!is_page($selected_pages)) {
                return;
            }
        }

        $css_exists = file_exists(plugin_dir_path(__FILE__) . '../serving/elegant-loader.css');
        $svg_url = get_option('elegant_loader_svg', '');
        if ($svg_url && $css_exists) {
            include_once plugin_dir_path(__FILE__) . '../serving/elegant-loader.php';
        }
    }
}
add_action('wp_footer', 'elegant_loader_display_svg');

function elegant_loader_enqueue_styles()
{
    wp_enqueue_style('elegant-loader-custom-css', plugin_dir_url(__FILE__) . '../serving/elegant-loader.css');
    wp_enqueue_script('elegant-loader-custom-js', plugin_dir_url(__FILE__) . '../serving/elegant-loader.js');
}
add_action('wp_enqueue_scripts', 'elegant_loader_enqueue_styles');

// hide the admin bar if we are in preview mode
function elegant_loader_hide_admin_bar()
{
    if (isset($_GET['elegant_loader']) && $_GET['elegant_loader'] === 'false') {
        add_filter('show_admin_bar', '__return_false');
    }
}
add_action('after_setup_theme', 'elegant_loader_hide_admin_bar');
