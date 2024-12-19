<?php

function elegant_loader_display_svg()
{
    $svg_url = get_option('elegant_loader_svg', '');
    if ($svg_url) {
        echo '<div class="elegant-loader">';
        echo '<img src="' . esc_url($svg_url) . '" alt="Loading...">';
        echo '</div>';
    }
}
add_action('wp_footer', 'elegant_loader_display_svg');
