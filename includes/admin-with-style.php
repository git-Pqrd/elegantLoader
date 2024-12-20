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
    <div class="flex flex-col gap-4">
        <h2 class="text-2xl md:text-3xl font-bold text-primary mt-8">Where should we show the loader?</h2>
        <p class="text-lg text-almost-black">Select the pages where you want to show the loader</p>
        <div class="flex flex-row gap-4">
            <select name="pages" id="pages" class="w-full h-full">
                <?php foreach (get_pages() as $page) : ?>
                    <option value="<?php echo $page->ID; ?>" multiple><?php echo $page->post_title; ?></option>
                <?php endforeach; ?>
                <?php foreach (get_posts() as $post) : ?>
                    <option value="<?php echo $post->ID; ?>" multiple><?php echo $post->post_title; ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <p class="text-lg text-almost-black">Select when we should show the loader</p>
        <div class="flex flex-row gap-4">
            <select name="pages" id="pages" class="w-full h-full">
                <option value="on-every-visit">On every visit</option>
                <option value="once-per-session">Once per session</option>
                <option value="once-per-page">Once per page</option>
                <option value="on-every-visit-and-once-per-session">On every visit and once per session</option>
                <option value="never">Never</option>
            </select>
        </div>

        <button class="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer
     hover:bg-primary-dark hover:-translate-y-1 transition-all duration-200
       lg:text-xl lg:font-black">
            Save the loader
        </button>
    </div>
</div>