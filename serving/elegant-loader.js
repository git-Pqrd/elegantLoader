document.addEventListener("DOMContentLoaded", function () {
  const frequency = elegantLoaderSettings.frequency;

  // Check if loader should be shown based on frequency
  const shouldShowLoader = () => {
    switch (frequency) {
      case "once-per-session":
        if (sessionStorage.getItem("elegantLoaderShown")) {
          return false;
        }
        sessionStorage.setItem("elegantLoaderShown", "true");
        return true;

      case "once-per-page":
        if (
          localStorage.getItem("elegantLoaderShown_" + window.location.pathname)
        ) {
          return false;
        }
        localStorage.setItem(
          "elegantLoaderShown_" + window.location.pathname,
          "true"
        );
        return true;

      case "every-visit":
        return true;

      default:
        return false;
    }
  };

  if (!shouldShowLoader()) {
    const loader = document.querySelector(".elegant-loader-container");
    if (loader) {
      loader.style.display = "none";
    }
  }
});
