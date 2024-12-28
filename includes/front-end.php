<?php

function elegant_loader_display_svg()
{
    if (!get_option('elegant_loader_svg')) {
        return;
    }

    if (isset($_GET['elegant_loader']) && $_GET['elegant_loader'] === 'false') {
        return;
    }

    // Check frequency setting
    $frequency = get_option('elegant_loader_frequency', 'every-visit');
    if ($frequency === 'never') {
        return;
    }

    // Check location settings
    $show_on_current_page = false;

    if (is_home() && get_option('elegant_loader_show_home')) {
        $show_on_current_page = true;
    } elseif (is_single() && get_option('elegant_loader_show_posts')) {
        $show_on_current_page = true;
    } elseif (is_page() && get_option('elegant_loader_show_pages')) {
        $show_on_current_page = true;
    } elseif (is_archive() && get_option('elegant_loader_show_archives')) {
        $show_on_current_page = true;
    } elseif (is_search() && get_option('elegant_loader_show_search')) {
        $show_on_current_page = true;
    }

    if (!$show_on_current_page) {
        return;
    }

    $css_exists = file_exists(plugin_dir_path(__FILE__) . '../serving/elegant-loader.css');
    $svg_url = get_option('elegant_loader_svg', '');
    if ($svg_url && $css_exists) {
        include_once plugin_dir_path(__FILE__) . '../serving/elegant-loader.php';
    }
}
add_action('wp_footer', 'elegant_loader_display_svg');

function elegant_loader_enqueue_styles()
{
    // Only enqueue if loader should be shown
    if (get_option('elegant_loader_svg')) {
        wp_enqueue_style('elegant-loader-custom-css', plugin_dir_url(__FILE__) . '../serving/elegant-loader.css');
        wp_enqueue_script('elegant-loader-custom-js', plugin_dir_url(__FILE__) . '../serving/elegant-loader.js');

        // Add frequency setting to JavaScript
        wp_localize_script('elegant-loader-custom-js', 'elegantLoaderSettings', array(
            'frequency' => get_option('elegant_loader_frequency', 'every-visit')
        ));
    }
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
