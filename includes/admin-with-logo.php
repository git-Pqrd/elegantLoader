<div class="min-h-screen bg-white p-8 max-w-7xl xl:mx-auto">
    <!-- Header Section -->
    <div class="mb-8 flex items-start justify-around p-4 rounded-lg relative">
        <div class="flex flex-col items-start gap-4 w-full md:w-1/2 lg:w-1/4">
            <h1 class="text-2xl md:text-3xl font-bold text-primary">ElegantLoader</h1>
            <p class="w-full max-w-4xl text-2xl md:text-3xl text-almost-black font-black">
                Nice Logo!,
            </p><span id="toggle-background-link" class="cursor-pointer text-sm underline">click here if you want to see it on a different background</span>
            <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/img/Saly-10.png'; ?>"
                alt="Character illustration" class="max-h-full h-auto w-1/2 max-w-[600px] -mb-2 object-contain hidden md:block" />
        </div>

        <div id="logo-container" class="bg-white rounded-lg p-4 w-full h-full md:w-1/2 lg:w-3/4 mx-4">
            <!-- Creating this so tailwind gen the class work -->
            <span class="bg-red-500 w-[1px] h-[1px]"></span>
            <span class="bg-black w-[1px] h-[1px]"></span>
            <span class="bg-green-500 w-[1px] h-[1px]"></span>
            <span class="bg-blue-500 w-[1px] h-[1px]"></span>
            <div class="flex flex-col items-center gap-4 w-auto h-full max-w-[200px] mx-auto">
                <img src="<?php echo get_option('elegant_loader_svg'); ?>" alt="Uploaded SVG" class="w-full h-full object-contain" />
            </div>
        </div>

        <!-- Upload Button -->
        <div class="absolute -top-2 right-4">
            <div class="remove-svg-button bg-light-red rounded-lg p-2 mb-4 flex items-center gap-2 cursor-pointer
     hover:bg-red-500 hover:-translate-y-1 transition-colors duration-200 animate-shadow-pulse">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="animation-option rounded-lg flex flex-col items-center justify-center">
                <div class="w-full h-48 bg-gray-300 mb-1"></div>
                <span class="text-primary">Smooth</span>
            </div>
            <div class="animation-option rounded-lg flex flex-col items-center justify-center">
                <div class="w-full h-48 bg-gray-300 mb-1"></div>
                <span class="text-primary">Minimalist</span>
            </div>
            <div class="animation-option rounded-lg flex flex-col items-center justify-center">
                <div class="w-full h-48 bg-gray-300 mb-1"></div>
                <span class="text-primary">Hard</span>
            </div>
            <div class="animation-option rounded-lg flex flex-col items-center justify-center">
                <div class="w-full h-48 bg-gray-300 mb-1"></div>
                <span class="text-primary">Smooth</span>
            </div>
            <div class="animation-option rounded-lg flex flex-col items-center justify-center">
                <div class="w-full h-48 bg-gray-300 mb-1"></div>
                <span class="text-primary">Minimalist</span>
            </div>
            <div class="animation-option p-4 rounded-lg flex flex-col items-center justify-center">
                <div class="w-full h-48 bg-gray-300 mb-1 flex items-center justify-center">
                    <span class="text-black">Get more with premium</span>
                </div>
            </div>
        </div>
    </div>
</div>