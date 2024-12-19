<?php

function elegant_loader_display_svg()
{
    if (get_option('elegant_loader_svg')) {
        if (isset($_GET['elegant_loader']) && $_GET['elegant_loader'] === 'false') {
            return;
        }
        $svg_url = get_option('elegant_loader_svg', '');
        if ($svg_url) {
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
