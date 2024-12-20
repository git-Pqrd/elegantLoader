<div class="min-h-screen bg-white max-w-[2000px] mx-auto
flex flex-col lg:flex-row-reverse">
    <!-- Preview Column -->
    <div class="w-full lg:w-2/3 md:p-2 lg:p-8 flex justify-center items-start">
        <div class="resize relative w-full min-h-[400px]
    max-h-[80%] md:h-96 lg:h-[800px] max-w-7xl bg-white border-primary-light border-solid border-l-4 rounded-sm overflow-hidden">
            <?php include_once plugin_dir_path(__FILE__) . 'logo-iframe.php'; ?>
        </div>
    </div>

    <!-- Controls Column -->
    <div id="elegant-options" class="w-full lg:w-1/3 p-4 py-8 flex flex-col justify-start items-start">
        <div class="flex flex-row justify-between items-end gap-4 mb-4">
            <h1 class="text-4xl font-black text-primary">Elegant Loader</h1>
            <!-- Advanced Mode -->
            <label class="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" id="advanced-mode-toggle">
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-light"></div>
                <span class="ms-3 text-sm font-medium text-primary">Advanced Mode</span>
            </label>
        </div>
        <p class="text-lg font-bold text-almost-black  border-b-4 border-primary-light pb-4">Customize your elegant loader to fit your brand</p>
        <!-- Editor -->
        <div id="elegant-options-container" class="flex flex-col gap-4 w-full h-auto">
        </div>

        <div class="flex flex-row justify-between items-center gap-4 mt-4 border-t-4 border-primary-light pt-4 w-full">
            <button id="save-button" class="bg-primary text-white px-4 py-2 rounded-sm flex items-center justify-center">
                Save the loader
            </button>

            <button id="reset-loader-button"
                class="bg-light-red text-white px-4 py-2 rounded-sm flex items-center justify-center">
                Reset the loader
            </button>
        </div>
    </div>


</div>