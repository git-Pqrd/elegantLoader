document.addEventListener("DOMContentLoaded", function () {
  const uploadButton = document.querySelector(".upload-svg-button");

  if (uploadButton) {
    uploadButton.addEventListener("click", function (event) {
      event.preventDefault();
      uploadButton.classList.add("loading");

      // Open the WordPress Media Uploader
      const mediaUploader = wp.media({
        title: "Upload Your SVG Logo",
        button: {
          text: "Select SVG",
        },
        library: wp.media.query({
          type: ["image/svg+xml", "image/svg"], // Add alternative MIME type
        }),
        multiple: false,
      });

      mediaUploader.on("select", function () {
        const attachment = mediaUploader
          .state()
          .get("selection")
          .first()
          .toJSON();

        // Add more detailed mime type checking
        if (
          attachment.mime === "image/svg+xml" ||
          attachment.mime === "image/svg"
        ) {
          console.log("Selected SVG:", attachment); // Log full attachment object
          jQuery.ajax({
            url: ajaxurl,
            type: "POST",
            data: {
              action: "update_elegant_loader_svg",
              svg_url: attachment.url,
              svg_id: attachment.id, // Add attachment ID
              nonce: elegant_loader_vars.nonce,
            },
            success: function (response) {
              uploadButton.classList.remove("loading");
              console.log("AJAX Response:", response); // Detailed logging
              if (response.success) {
                window.location.reload();
              } else {
                alert(
                  response.data?.message ||
                    "Error saving SVG. Please try again."
                );
              }
            },
            error: function (xhr, status, error) {
              uploadButton.classList.remove("loading");
              console.error("AJAX Error:", { xhr, status, error }); // Log error details
              alert("Error saving SVG. Please check console for details.");
            },
          });
        } else {
          uploadButton.classList.remove("loading");
          console.error("Invalid mime type:", attachment.mime); // Log invalid mime type
          alert("Invalid file selected. Please upload an SVG file.");
        }
      });

      mediaUploader.open();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const removeButton = document.querySelector(".remove-svg-button");
  if (removeButton) {
    removeButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (!confirm("Are you sure you want to remove the SVG logo?")) {
        return;
      }
      removeButton.classList.add("loading");
      jQuery.ajax({
        url: ajaxurl,
        type: "POST",
        data: {
          action: "remove_elegant_loader_options",
          nonce: elegant_loader_vars.nonce,
        },
        success: function (response) {
          removeButton.classList.remove("loading");
          console.log("AJAX Response:", response);
          // Parse response if it's a string
          if (typeof response === "string") {
            try {
              response = JSON.parse(response);
            } catch (e) {
              console.error("Failed to parse response:", e);
            }
          }

          if (
            response &&
            (response.success === true || response.success === "true")
          ) {
            window.location.reload();
          } else {
            alert(
              response.data?.message || "Error removing SVG. Please try again."
            );
          }
        },
        error: function (xhr, status, error) {
          removeButton.classList.remove("loading");
          console.error("AJAX Error:", { xhr, status, error }); // Log error details
          alert("Error removing SVG. Please check console for details.");
        },
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const blackBackgroundLink = document.querySelector("#toggle-background-link");
  if (blackBackgroundLink) {
    blackBackgroundLink.addEventListener("click", function (event) {
      event.preventDefault();
      const logoContainer = document.querySelector("#logo-container");
      if (logoContainer.classList.contains("bg-white")) {
        logoContainer.classList.add("bg-transparent");
        logoContainer.classList.remove("bg-white");
      } else if (logoContainer.classList.contains("bg-transparent")) {
        logoContainer.classList.add("bg-black");
        logoContainer.classList.remove("bg-transparent");
      } else if (logoContainer.classList.contains("bg-black")) {
        logoContainer.classList.add("bg-blue-500");
        logoContainer.classList.remove("bg-black");
      } else if (logoContainer.classList.contains("bg-blue-500")) {
        logoContainer.classList.add("bg-green-500");
        logoContainer.classList.remove("bg-blue-500");
      } else if (logoContainer.classList.contains("bg-green-500")) {
        logoContainer.classList.add("bg-red-500");
        logoContainer.classList.remove("bg-green-500");
      } else if (logoContainer.classList.contains("bg-red-500")) {
        logoContainer.classList.add("bg-white");
        logoContainer.classList.remove("bg-red-500");
      }
    });
  }
});

function previewStyle(style) {
  const continueCTA = document.getElementById("animation-option-continue");
  const animationOption = document.getElementById("animation-option-" + style);
  if (animationOption) {
    if (animationOption.classList.contains("selected")) {
      animationOption.classList.remove("selected");
      continueCTA.classList.add("hidden");
    } else {
      Array.from(document.getElementsByClassName("animation-option")).forEach(
        (option) => {
          if (option !== animationOption) {
            option.classList.remove("selected");
          }
        }
      );
      animationOption.classList.add("selected");
      window.selectedStyle = style;
      continueCTA.classList.remove("hidden");
      continueCTA.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    console.error("Animation option not found for style:", style);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const continueCTA = document.getElementById(
    "animation-option-continue-button"
  );
  continueCTA.addEventListener("click", function (event) {
    event.preventDefault();
    jQuery.ajax({
      url: ajaxurl,
      type: "POST",
      data: {
        action: "upload_elegant_loader_css",
        nonce: elegant_loader_vars.nonce,
        data: {
          style: window.selectedStyle,
        },
      },
      success: function (response) {
        continueCTA.classList.remove("loading");
        console.log("AJAX Response:", response);
        // Parse response if it's a string
        if (typeof response === "string") {
          try {
            response = JSON.parse(response);
          } catch (e) {
            console.error("Failed to parse response:", e);
          }
        }

        if (
          response &&
          (response.success === true || response.success === "true")
        ) {
          window.location.reload();
        } else {
          alert(
            response.data?.message || "Error uploading CSS. Please try again."
          );
        }
      },
      error: function (xhr, status, error) {
        continueCTA.classList.remove("loading");
        console.error("AJAX Error:", { xhr, status, error }); // Log error details
        alert("Error uploading CSS. Please check console for details.");
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const goToEditorButton = document.getElementById("go-to-editor-button");
  if (goToEditorButton) {
    goToEditorButton.addEventListener("click", function (event) {
      event.preventDefault();
      console.log(window.location.href);
      window.location.href =
        window.location.href.split("?")[0] +
        "?" +
        window.location.href.split("?")[1] +
        "&should_show_editor=true";
    });
  }
});
