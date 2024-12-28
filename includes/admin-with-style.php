<div class="min-h-screen bg-white p-8 max-w-7xl xl:mx-auto">
    <!-- Header Section -->
    <div class="mb-8 flex items-start justify-between h-auto bg-gray-light p-4 rounded-lg relative">
        <div class="flex flex-col items-start gap-4">
            <h1 class="text-2xl md:text-3xl font-bold text-primary">ElegantLoader</h1>
            <p class="w-full max-w-4xl text-2xl md:text-3xl text-almost-black font-black">Congrats, your Loader looks awesome!</p>
        </div>
        <div id="logo-container" class="rounded-lg p-4 w-full  h-auto max-h-[400px] min-h-[300px]
            md:w-1/2 lg:w-3/4 mx-4 grid grid-cols-1 grid-rows-1 overflow-visible">
            <?php include_once plugin_dir_path(__FILE__) . 'logo-iframe.php'; ?>
        </div>
        <!-- Upload Button -->
        <div class="absolute -bottom-10 left-4 flex flex-row gap-4">
            <div id="go-to-editor-button" class=" bg-primary rounded-lg p-4 mb-4 flex items-center gap-2 cursor-pointer
     hover:bg-primary-dark hover:-translate-y-1 transition-all duration-200 animate-shadow-pulse
       lg:text-xl lg:font-black">
                <img src="<?php echo plugin_dir_url(__FILE__) . '../assets/icons/upload.svg'; ?>" alt="Upload" class="fill-white w-auto h-8">
                <span class="text-white">Edit your loader</span>
            </div>
            <div class="remove-svg-button upload-svg-button bg-light-red rounded-lg p-4 mb-4 flex items-center gap-2 cursor-pointer
     hover:bg-red-500 hover:-translate-y-1 transition-all duration-200
       lg:text-xl lg:font-black">
                <span class="text-white">Start from scratch</span>
            </div>
        </div>
    </div>

    <!-- Where should we show the loader? -->
    <div class="flex flex-col gap-8 mt-12">
        <!-- Location Settings -->
        <div class="flex flex-col gap-4">
            <h2 class="text-2xl md:text-3xl font-bold text-primary">Where should we show the loader?</h2>
            <p class="text-lg text-almost-black mb-4">Select the pages where you want to show the loader</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <label class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="show_on_home" class="w-5 h-5 accent-primary">
                    <span class="text-lg">Homepage</span>
                </label>

                <label class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="show_on_posts" class="w-5 h-5 accent-primary">
                    <span class="text-lg">All Posts</span>
                </label>

                <label class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="show_on_pages" class="w-5 h-5 accent-primary">
                    <span class="text-lg">All Pages</span>
                </label>

                <label class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="show_on_archives" class="w-5 h-5 accent-primary">
                    <span class="text-lg">Archive Pages</span>
                </label>

                <label class="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" name="show_on_search" class="w-5 h-5 accent-primary">
                    <span class="text-lg">Search Results</span>
                </label>
            </div>
        </div>

        <!-- Frequency Settings -->
        <div class="flex flex-col gap-4 mt-8">
            <h2 class="text-2xl md:text-3xl font-bold text-primary">How often should we show the loader?</h2>
            <p class="text-lg text-almost-black mb-4">Choose how frequently visitors will see the loading animation</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <label class="flex flex-col gap-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div class="flex items-center gap-3">
                        <input type="radio" name="frequency" value="every-visit" class="w-5 h-5 accent-primary">
                        <span class="text-lg font-medium">Every Visit</span>
                    </div>
                    <p class="text-gray-600 ml-8">Show the loader on every page load</p>
                </label>

                <label class="flex flex-col gap-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div class="flex items-center gap-3">
                        <input type="radio" name="frequency" value="once-per-session" class="w-5 h-5 accent-primary">
                        <span class="text-lg font-medium">Once Per Session</span>
                    </div>
                    <p class="text-gray-600 ml-8">Show only once when a user starts browsing</p>
                </label>

                <label class="flex flex-col gap-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div class="flex items-center gap-3">
                        <input type="radio" name="frequency" value="once-per-page" class="w-5 h-5 accent-primary">
                        <span class="text-lg font-medium">Once Per Page</span>
                    </div>
                    <p class="text-gray-600 ml-8">Show once on each unique page</p>
                </label>

                <label class="flex flex-col gap-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div class="flex items-center gap-3">
                        <input type="radio" name="frequency" value="never" class="w-5 h-5 accent-primary">
                        <span class="text-lg font-medium">Disabled</span>
                    </div>
                    <p class="text-gray-600 ml-8">Don't show the loader</p>
                </label>
            </div>
        </div>
    </div>

    <!-- Save Button -->
    <button type="submit" class="mt-8 bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 cursor-pointer
     hover:bg-primary-dark hover:-translate-y-1 transition-all duration-200
       lg:text-xl lg:font-bold">
        <span>Save Settings</span>
    </button>
</div>