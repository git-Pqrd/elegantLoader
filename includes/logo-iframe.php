<?php
$path = plugin_dir_path(__FILE__) . '../serving/elegant-loader.php';
if (file_exists($path)) {
    $svg_url = get_option('elegant_loader_svg');
    if (!empty($svg_url) && !empty(get_option('elegant_loader_style'))) {
?>
        <iframe
            id="previewFrame" style="width:100%; height:100%; min-height:400px;">
        </iframe>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const iframe = document.getElementById('previewFrame');
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                doc.open();
                doc.write(`
                                        <html>
                                        <head>
                                            <style> 
                                                <?php echo file_get_contents(get_option('elegant_loader_style')); ?>
                                            </style> 
                                        </head>
                                        <body style="width:100vw; height:100vh; overflow:hidden;">
                                            <?php include_once $path; ?>
                                            <iframe src="<?php echo home_url('/'); ?>?elegant_loader=false" style="width:100vw; height:100vh;"></iframe>
                                        </body>
                                        </html>
                                    `);
                doc.close();
            });
        </script>
<?php
    } else {
        echo '<div class="flex items-center justify-center h-full text-gray-500">Please upload an SVG logo first</div>';
    }
} else {
    echo '<div class="flex items-center justify-center h-full text-red-500">Error: File does not exist at path: ' . $path . '</div>';
}
?>

<button id="restart-animation-button"
    class="absolute bottom-4 right-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-sm flex items-center justify-center">
    <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/icons/refresh.svg'; ?>" alt="Restart Animation" class="w-4 h-4 mr-2">
    Restart Animation
</button>