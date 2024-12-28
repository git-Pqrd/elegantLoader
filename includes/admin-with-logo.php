<div class="min-h-screen bg-white p-8 max-w-7xl xl:mx-auto">
    <!-- Header Section -->
    <div class="mb-8 flex items-start justify-around p-4 rounded-lg bg-gray-light relative h-full">
        <div class="flex flex-col items-start gap-4 w-full md:w-1/2 lg:w-1/4">
            <h1 class="text-2xl md:text-3xl font-bold text-primary">ElegantLoader</h1>
            <p class="w-full max-w-4xl text-2xl md:text-3xl text-almost-black font-black">
                Nice Logo!,
            </p><span id="toggle-background-link" class="cursor-pointer text-sm underline">click here if you want to see it on a different background</span>
            <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/img/Saly-10.png'; ?>"
                alt="Character illustration" class="max-h-full h-auto w-1/2 max-w-[600px] -mb-2 object-contain hidden md:block" />
        </div>

        <div id="logo-container" class="bg-white rounded-lg p-4 w-full min-h-[300px] h-full max-h-[400px] md:w-1/2 lg:w-3/4 mx-4 grid grid-cols-1 grid-rows-1">
            <!-- Creating this so tailwind gen the class work -->
            <span class="bg-red-500 w-[1px] h-[1px] absolute top-0 left-0"></span>
            <span class="bg-black w-[1px] h-[1px] absolute top-0 left-0"></span>
            <span class="bg-green-500 w-[1px] h-[1px] absolute top-0 left-0"></span>
            <span class="bg-blue-500 w-[1px] h-[1px] absolute top-0 left-0"></span>
            <div class="flex flex-col items-center w-auto h-full max-w-[200px] mx-auto">
                <img src="<?php echo get_option('elegant_loader_svg'); ?>" alt="Uploaded SVG" class="w-full h-full object-contain" />
            </div>
        </div>

        <!-- Upload Button -->
        <div class="absolute -top-2 right-4">
            <div class="remove-svg-button bg-light-red rounded-lg p-2 mb-4 flex items-center gap-2 cursor-pointer
     hover:bg-red-500 hover:-translate-y-1 transition-colors duration-200">
                <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/icons/remove.svg'; ?>" alt="remove" class="fill-white w-auto h-8">
                <span class="text-white font-medium">Start with a new logo</span>
            </div>
        </div>
    </div>

    <div class="animation-selection bg-white py-8">
        <div class="grid grid-cols-1 ml-4 mb-12 border-l-8 border-primary pl-4">
            <p class="text-2xl text-almost-black font-black">
                First let's pick a style of animation you like.
            </p>
            <p class="text-gray-600 text-xl leading-relaxed w-full md:w-[90%]">
                We will change the size and the color after.
            </p>
        </div>
        <!-- If the files exists, show the animation -->
        <?php
        // define all the styles of animations
        $styles = [
            'drawing',
            'pastel',
            'shaded',
            'energetic',
            'elegant',
            'funky',
            'writing',
            'classy',
            'minimalist',
        ]; ?>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <?php foreach ($styles as $style) : ?>
                <!-- Check if the files exists -->
                <?php if (
                    !file_exists(plugin_dir_path(__FILE__) . '../template/' . $style . '.css') ||
                    !file_exists(plugin_dir_path(__FILE__) . '../template/' . $style . '.png') ||
                    !file_exists(plugin_dir_path(__FILE__) . '../template/' . $style . '.gif')
                ) :
                    continue;
                endif; ?>

                <div id="animation-option-<?php echo $style; ?>"
                    class="animation-option rounded-lg flex flex-col cursor-pointer items-center" onclick="previewStyle('<?php echo $style; ?>')">
                    <div class="w-full h-48 bg-gray-300 mb-1 relative">
                        <img src="<?php echo plugin_dir_url(__FILE__) . '../template/' . $style . '.png'; ?>"
                            alt="<?php echo ucfirst($style); ?> Animation"
                            class="absolute inset-0 w-full h-full object-cover opacity-100 hover:opacity-0 transition-opacity duration-300">
                        <img src="<?php echo plugin_dir_url(__FILE__) . '../template/' . $style . '.gif'; ?>"
                            alt="<?php echo ucfirst($style); ?> Animation"
                            class="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300">
                    </div>
                    <span class="text-primary text-xl w-full text-right"><?php echo ucfirst($style); ?></span>
                </div>
            <?php endforeach; ?>
            <a id="animation-option-pro"
                href="https://elegantloader.pro"
                target="_blank"
                class="animation-option rounded-lg flex flex-col cursor-pointer items-center">
                <div class="w-full h-48 bg-gray-300 mb-1 relative">
                    <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/img/pro-illustration.webp'; ?>"
                        alt="ElegantLoader.pro"
                        class="absolute inset-0 w-full h-full object-cover opacity-100">

                </div>
                <span class="text-primary text-xl w-full text-right">Get More with ElegantLoader.pro!</span>
            </a>
        </div>
    </div>

    <div id="animation-option-continue" class="gap-4 mt-8 hidden">
        <button id="animation-option-continue-button" type="submit" class="text-xl bg-primary hover:bg-primary-dark text-white p-2 mb-4 flex items-center gap-2 cursor-pointer hover:-translate-y-1 transition-colors duration-200 px-4 py-2 rounded-sm">
            <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/icons/right-arrow.svg'; ?>" alt="arrow-right" class="w-auto h-4">
            Nice! Click here to continue
        </button>
    </div>
</div>