<?php

/**
 * Adds the Elegant Loader menu item to the WordPress admin menu.
 *
 * @return void
 */
function elegant_loader_add_admin_menu()
{
    add_menu_page(
        'Elegant Loader',
        'Elegant Loader',
        'manage_options',
        'elegant-loader',
        'elegant_loader_admin_page',
        'dashicons-format-image',
        20
    );
}
add_action('admin_menu', 'elegant_loader_add_admin_menu');

/**
 * Enqueues the necessary CSS and JavaScript files for the admin interface.
 * Also localizes JavaScript variables for AJAX functionality.
 *
 * @return void
 */
function elegant_loader_admin_scripts()
{
    wp_enqueue_style('elegant-loader-css', plugin_dir_url(__FILE__) . '../assets/scripts/styles.css');
    wp_enqueue_script('elegant-loader-script', plugin_dir_url(__FILE__) . '../assets/scripts/script.js', array('jquery'), '1.0', true);
    // Localize the variable
    wp_localize_script('elegant-loader-script', 'elegant_loader_vars', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('elegant_loader_upload'),
        'error_message' => __('Only SVG files are allowed.', 'elegant-loader'),
    ]);
}
add_action('admin_enqueue_scripts', 'elegant_loader_admin_scripts');

/**
 * Enqueues the WordPress media uploader script.
 *
 * @return void
 */
function enqueue_media_uploader_script()
{
    wp_enqueue_media();
}
add_action('admin_enqueue_scripts', 'enqueue_media_uploader_script');

/** 
 * Enque the editor script if the user is on the editor page
 */
function enqueue_editor_script()
{
    if (isset($_GET['page']) && $_GET['page'] === 'elegant-loader') {
        wp_enqueue_script('elegant-loader-editor', plugin_dir_url(__FILE__) . '../assets/scripts/editor.js', array('jquery'), '1.0', true);
    }
}
add_action('admin_enqueue_scripts', 'enqueue_editor_script');

/**
 * Renders the admin page content.
 * Displays different templates based on whether an SVG logo is already uploaded.
 *
 * @return void
 */
function elegant_loader_admin_page()
{
?>
    <div class="elegant-admin">
        <?php if (get_option('elegant_loader_svg') && !get_option('elegant_loader_style')) : ?>
            <?php include_once plugin_dir_path(__FILE__) . 'admin-with-logo.php'; ?>
        <?php elseif (get_option('elegant_loader_svg') && get_option('elegant_loader_style')) : ?>
            <?php include_once plugin_dir_path(__FILE__) . 'admin-editor.php'; ?>
        <?php else : ?>
            <?php include_once plugin_dir_path(__FILE__) . 'admin-no-logo.php'; ?>
        <?php endif; ?>
    </div>
<?php
}

/**
 * Handles the AJAX request to update the SVG logo.
 * Validates the nonce and required data before updating options.
 *
 * @return array Response array indicating success or failure
 */
function update_elegant_loader_svg()
{

    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'elegant_loader_upload')) {
        return array('success' => false, 'data' => array('message' => 'Invalid nonce.'));
    }

    if (!isset($_POST['svg_url']) || !isset($_POST['svg_id'])) {
        return array('success' => false, 'data' => array('message' => 'Missing SVG data.'));
    }

    $url = esc_url_raw($_POST['svg_url']);
    $id = intval($_POST['svg_id']);

    update_option('elegant_loader_svg', $url);
    update_option('elegant_loader_svg_id', $id);

    wp_send_json_success(['success' => true]);
}
add_action('wp_ajax_update_elegant_loader_svg', 'update_elegant_loader_svg');

/**
 * Restricts file uploads to SVG files only.
 *
 * @param array $file The uploaded file information
 * @return array Modified file array with error if not SVG
 */
function restrict_to_svg_upload($file)
{
    $filetype = wp_check_filetype($file['name']);

    // Check if the file is an SVG
    if ($filetype['ext'] !== 'svg' && $filetype['type'] !== 'image/svg+xml') {
        $file['error'] = 'Only SVG files are allowed.';
    }

    return $file;
}
add_filter('wp_handle_upload_prefilter', 'restrict_to_svg_upload');

/**
 * Adds SVG to the list of allowed mime types for upload.
 *
 * @param array $mimes Current allowed mime types
 * @return array Modified mime types array including SVG
 */
function allow_svg_upload($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'allow_svg_upload');


/**
 * Handles the AJAX request to remove the SVG logo.
 * Validates the nonce before deleting options.
 *
 * @return array Response array indicating success or failure
 */
function remove_elegant_loader_options()
{
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'elegant_loader_upload')) {
        return array('success' => false, 'data' => array('message' => 'Invalid nonce.'));
    }

    delete_option('elegant_loader_svg');
    delete_option('elegant_loader_svg_id');
    delete_option('elegant_loader_style');
    wp_send_json_success(['success' => true]);
}
add_action('wp_ajax_remove_elegant_loader_options', 'remove_elegant_loader_options');

function upload_elegant_loader_css()
{
    $style = $_POST['data']['style'];
    update_option('elegant_loader_style', $style);
    wp_send_json_success(['success' => true]);
}
add_action('wp_ajax_upload_elegant_loader_css', 'upload_elegant_loader_css');
