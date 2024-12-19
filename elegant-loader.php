<?php
/*
Plugin Name: Elegant Loader
Plugin URI: https://example.com/elegant-loader
Description: A plugin that allows users to upload SVGs and display them as smooth-loading animations.
Version: 1.0
Author: Your Name
Author URI: https://yourwebsite.com
License: GPL2
Text Domain: elegant-loader
*/

if (!defined('ABSPATH')) {
    exit; // Prevent direct access.
}

// Include required files.
include_once plugin_dir_path(__FILE__) . 'includes/admin.php';
include_once plugin_dir_path(__FILE__) . 'includes/front-end.php';

// Enqueue styles and scripts.
function elegant_loader_enqueue_assets()
{
    wp_enqueue_style('elegant-loader-styles', plugin_dir_url(__FILE__) . 'assets/css/styles.css');
    wp_enqueue_script('elegant-loader-script', plugin_dir_url(__FILE__) . 'assets/js/script.js', array('jquery'), '1.0', true);
}
add_action('wp_enqueue_scripts', 'elegant_loader_enqueue_assets');
