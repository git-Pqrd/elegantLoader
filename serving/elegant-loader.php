<div id="elegant-loader-container">
    <?php
    $svg_content = file_get_contents($svg_url);
    $svg_content = str_replace('<svg', '<svg class="elegant-loader-svg"', $svg_content);
    echo $svg_content;
    ?>
    <?php $loader_text = get_option('elegant_loader_text'); ?>
    <?php if ($loader_text) : ?>
        <div class="elegant-loader-text"><?php echo $loader_text; ?></div>
    <?php endif; ?>
</div>