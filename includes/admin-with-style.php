<div class="min-h-screen bg-white p-8 max-w-7xl xl:mx-auto">
    <!-- Header Section -->
    <div class="mb-8 flex items-start justify-between bg-gray-light p-4 pb-0 rounded-lg relative">
        <div class="flex flex-col items-start gap-4">
            <h1 class="text-2xl md:text-3xl font-bold text-primary">ElegantLoader</h1>
            <p class="w-full max-w-4xl text-2xl md:text-3xl text-almost-black font-black">Congrats, your logo looks awesome!</p>
        </div>
        <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/img/Saly-10.png'; ?>"
            alt="Character illustration" class="max-h-full h-auto w-1/2 max-w-[600px] -mb-2 object-contain hidden md:block self-end" />

        <!-- Upload Button -->
        <div class="absolute -bottom-10 left-4">
            <div class="upload-svg-button bg-primary rounded-lg p-4 mb-4 flex items-center gap-2 cursor-pointer
     hover:bg-primary-dark hover:-translate-y-1 transition-all duration-200 animate-shadow-pulse
       lg:text-xl lg:font-black">
                <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/icons/upload.svg'; ?>" alt="Upload" class="fill-white w-auto h-8">
                <span class="text-white">Upload your SVG logo</span>
            </div>
        </div>
        <div class="absolute -bottom-10 right-4">
            <div class="remove-svg-button upload-svg-button bg-light-red rounded-lg p-4 mb-4 flex items-center gap-2 cursor-pointer
     hover:bg-red-500 hover:-translate-y-1 transition-all duration-200 animate-shadow-pulse
       lg:text-xl lg:font-black">
                <span class="text-white">Start from scratch</span>
            </div>
        </div>
    </div>

</div>