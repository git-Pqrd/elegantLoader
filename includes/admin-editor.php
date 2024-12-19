<div class="min-h-screen bg-white max-w-[2000px] mx-auto
flex flex-col md:flex-row-reverse">
    <!-- Preview Column -->
    <div class="w-full md:w-1/2 lg:w-2/3 md:p-2 lg:p-8 flex justify-center items-start">
        <div class="resize relative w-full max-h-[80%] md:h-96 lg:h-[800px] max-w-7xl bg-white border-primary-light border-solid border-l-4 rounded-sm overflow-hidden">
            <?php
            $path = plugin_dir_path(__FILE__) . '../serving/elegant-loader.php';
            if (file_exists($path)) {
                $svg_url = get_option('elegant_loader_svg');
                if (!empty($svg_url) && !empty(get_option('elegant_loader_style'))) {
            ?>
                    <iframe
                        id="previewFrame" style="width:100%; height:100%;">
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
                                                <?php echo file_get_contents(plugin_dir_path(__FILE__) . '../template/' . get_option('elegant_loader_style') . '.css'); ?>
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
                class="absolute bottom-4 right-4 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-sm">
                Restart Animation
            </button>
        </div>
    </div>

    <!-- Controls Column -->
    <div class="w-full md:w-1/2 lg:w-1/3 p-4 py-8 flex flex-col justify-start items-start">
        <h1 class="text-4xl font-black text-primary">Elegant Loader</h1>
        <p class="text-lg font-bold text-almost-black mb-4 border-b-4 border-primary-light pb-4">Customize your elegant loader to fit your brand</p>
        <div class="flex flex-col gap-4 p-4 w-full h-full">
            <div class="flex items-center justify-between w-full">
                <label>Background Color</label>
                <input type="color" class="h-8 w-16" value="#000000" />
            </div>

            <div class="flex items-center justify-between w-full">
                <label>Logo Size</label>
                <input type="color" class="h-8 w-16" value="#000000" />
            </div>

            <div class="flex items-center justify-between w-full">
                <label>Animation Speed</label>
                <input type="range" min="0" max="100" value="50" class="w-32" />
            </div>

            <div class="flex items-center justify-between w-full">
                <label>Fade Duration</label>
                <input type="range" min="0" max="100" value="50" class="w-32" />
            </div>

            <div class="flex items-center justify-between w-full">
                <label>Border Width</label>
                <input type="range" min="0" max="100" value="50" class="w-32" />
            </div>

            <div class="flex items-center justify-between w-full">
                <label>Shadow Opacity</label>
                <input type="color" class="h-8 w-16" value="#999999" />
            </div>
        </div>
    </div>
</div>