<div id="elegant-loader-container">
    <?php
    $svg_content = file_get_contents($svg_url);
    $svg_content = str_replace('<svg', '<svg class="elegant-loader-svg"', $svg_content);
    echo $svg_content;
    ?>
</div>