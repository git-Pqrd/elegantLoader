let currentStyleContent = "";
let initialStyle = "";
let isAdvanced = false;

const allowedProperties = {
  basic: [
    {
      property: "background-color",
      label: "Background Color",
      type: "gradient",
      category: "appearance",
      unit: "",
    },
    {
      property: "color",
      label: "Text Color",
      type: "color",
      category: "appearance",
      unit: "",
    },
    {
      property: "width",
      label: "Width",
      type: "range",
      min: 0,
      max: 100,
      category: "size",
      unit: "%",
    },
    {
      property: "height",
      label: "Height",
      type: "range",
      min: 0,
      max: 100,
      category: "size",
      unit: "%",
    },
    {
      property: "border-radius",
      label: "Border Radius",
      type: "text",
      category: "appearance",
      unit: "px",
    },
    {
      property: "stroke",
      label: "Stroke Color",
      type: "color",
      category: "svg",
      unit: "",
    },
    {
      property: "fill",
      label: "Fill Color",
      type: "color",
      category: "svg",
      unit: "",
    },
    {
      property: "background-image",
      label: "Background Gradient",
      type: "gradient",
      category: "appearance",
      unit: "",
    },
  ],
  advanced: [
    {
      property: "border-color",
      label: "Border Color",
      type: "color",
      category: "border",
      unit: "",
    },
    {
      property: "border-width",
      label: "Border Width",
      type: "text",
      category: "border",
      unit: "px",
    },
    {
      property: "margin",
      label: "Margin",
      type: "text",
      category: "spacing",
      unit: "px",
    },
    {
      property: "padding",
      label: "Padding",
      type: "text",
      category: "spacing",
      unit: "px",
    },
    {
      property: "font-size",
      label: "Font Size",
      type: "text",
      category: "typography",
      unit: "px",
    },
    {
      property: "font-weight",
      label: "Font Weight",
      type: "text",
      category: "typography",
      unit: "",
    },
    {
      property: "text-align",
      label: "Text Align",
      type: "select",
      options: ["left", "center", "right"],
      category: "typography",
      unit: "",
    },
    {
      property: "text-transform",
      label: "Text Transform",
      type: "select",
      options: ["none", "uppercase", "lowercase", "capitalize"],
      category: "typography",
      unit: "",
    },
    {
      property: "animation-duration",
      label: "Animation Duration",
      type: "text",
      category: "animation",
      unit: "s",
    },
    {
      property: "animation-iteration-count",
      label: "Animation Repeat",
      type: "text",
      category: "animation",
      unit: "",
    },
    {
      property: "animation-timing-function",
      label: "Animation Timing",
      type: "select",
      options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"],
      category: "animation",
      unit: "",
    },
    {
      property: "stroke-dasharray",
      label: "Stroke Dash Array",
      type: "text",
      category: "svg",
      unit: "px",
    },
    {
      property: "stroke-dashoffset",
      label: "Stroke Dash Offset",
      type: "text",
      category: "svg",
      unit: "px",
    },
    {
      property: "stroke-width",
      label: "Stroke Width",
      type: "text",
      category: "svg",
      unit: "px",
    },
    {
      property: "stroke-linecap",
      label: "Stroke Line Cap",
      type: "select",
      options: ["butt", "round", "square"],
      category: "svg",
      unit: "",
    },
  ],
};

function createInputField(ruleSelector, property, value) {
  const propertyInfo = [
    ...allowedProperties.basic,
    ...(isAdvanced ? allowedProperties.advanced : []),
  ].find((item) => item.property === property);

  if (!propertyInfo) return null;

  const childDiv = document.createElement("div");
  childDiv.className = "flex items-center justify-between w-full";

  const label = document.createElement("label");
  label.textContent = propertyInfo.label + ": ";
  label.style.setProperty("min-width", "100px");
  label.className = "w-1/3 text-md font-bold";

  let input;

  if (propertyInfo.type === "select") {
    input = document.createElement("select");
    propertyInfo.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      optionElement.selected = option === value;
      input.appendChild(optionElement);
    });
  } else if (propertyInfo.type === "color") {
    input = document.createElement("input");
    input.type = "color";
    input.value = value;
    input.className =
      "p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg" +
      " disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700";
  } else if (propertyInfo.type === "gradient") {
    input = createGradientDiv(property, value);
  } else if (propertyInfo.type === "range") {
    input = createRangeInput(propertyInfo, value);
  } else {
    input = document.createElement("input");
    input.type = propertyInfo.type;
    input.className = "h-8 w-auto min-w-44";
  }
  if (input.type !== "select" && !input.value) {
    input.value = value;
  }
  input.attributes.property = property;
  input.attributes.rule_selector = ruleSelector;

  childDiv.appendChild(label);
  childDiv.appendChild(input);

  return childDiv;
}

function createGradientDiv(property, value) {
  const childDiv = document.createElement("div");
  childDiv.className = "flex items-center justify-end w-full";

  const colorRegex =
    /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|rgba?\(\s*(\d{1,3}\s*,\s*){2,3}\d{1,3}\s*(,\s*\d+(\.\d+)?\s*)?\)/g;
  const colors = value.match(colorRegex);
  console.log(colors);
  colors.forEach((color) => {
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = color;
    colorInput.className =
      "m-1 h-10 w-14 block border border-primary cursor-pointer";
    childDiv.appendChild(colorInput);
  });
  console.log(childDiv);
  return childDiv;
}

function createRangeInput(propertyInfo, value) {
  const input = document.createElement("input");
  input.type = "range";
  input.min = propertyInfo.min;
  input.max = propertyInfo.max;
  input.className =
    "h-4 py-2 w-full bg-gray-200 max-w-[400px] rounded-lg appearance-none cursor-pointer";
  input.style.background = "linear-gradient(90deg, #6cb4b4 0%, #99d9d9 100%)";
  input.style.outline = "none";

  // Parse initial value and handle invalid values
  let initialValue = parseInt(value) || 0;
  initialValue = Math.max(
    propertyInfo.min,
    Math.min(propertyInfo.max, initialValue)
  );
  input.value = String(initialValue);
  return input;
}

function generateOptions(currentStyleContent) {
  const optionsContainer = document.getElementById("elegant-options-container");
  if (!optionsContainer) return;

  const css = new CSSStyleSheet();
  css.replaceSync(currentStyleContent);
  optionsContainer.innerHTML = "";
  // Create input fields based on CSS properties
  Array.from(css.cssRules).forEach((rule) => {
    let parentDiv = document.createElement("div");
    parentDiv.className = "flex items-start flex-col justify-between w-full";
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = rule?.selectorText?.split("-")[2] || "Default";
    sectionTitle.className = "text-2xl font-bold";
    parentDiv.appendChild(sectionTitle);

    // If field is found in allowedProperties, create input field
    Array.from(rule.style).forEach((property) => {
      const inputField = createInputField(
        rule.selectorText,
        property,
        rule.style.getPropertyValue(property)
      );
      if (inputField) {
        parentDiv.appendChild(inputField);
      }
    });

    optionsContainer.appendChild(parentDiv);
  });
}

function restartIframe(iframe) {
  if (!iframe) return;
  try {
    // Get the iframe document
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const bodyContent = iframeDoc.body.innerHTML;
    // Recreate the document content
    iframeDoc.open();
    iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                ${currentStyleContent}
              </style>
            </head>
            <body>
              ${bodyContent}
            </body>
          </html>
        `);
    iframeDoc.close();

    // Force a repaint (optional, but can help with some animations)
    iframe.style.display = "none";
    iframe.offsetHeight; // Force reflow
    iframe.style.display = "";
  } catch (error) {
    console.error("Error restarting iframe:", error);

    // Alternative method: reload the iframe src
    if (iframe.src) {
      iframe.src = iframe.src;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initialStyle =
    document
      .getElementById("previewFrame")
      .contentDocument.querySelector("style")?.innerHTML || "";
  // Set the initial style content to the initial style
  currentStyleContent = initialStyle;
  generateOptions(currentStyleContent);
});

document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("previewFrame");
  const restartIframeButton = document.getElementById(
    "restart-animation-button"
  );

  if (iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    styleContent = iframeDoc.querySelector("style")?.innerHTML || "";
  }

  restartIframeButton?.addEventListener("click", function () {
    restartIframe(iframe);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("save-button");
  saveButton?.addEventListener(["click"], function (event) {
    event.preventDefault();
    saveButton.classList.add("loading");
    jQuery.ajax({
      url: ajaxurl,
      type: "POST",
      data: {
        action: "save_elegant_loader_css",
        nonce: elegant_loader_vars.nonce,
        data: {
          style: currentStyleContent,
        },
      },
      success: function (response) {
        saveButton.classList.remove("loading");
        alert("The loader has been saved successfully");
        window.location.href =
          window.location.href.split("?")[0] +
          "?" +
          window.location.href
            .split("?")[1]
            .replace("should_show_editor=true", "");
        // Parse response if it's a string
        if (typeof response === "string") {
          try {
            response = JSON.parse(response);
          } catch (e) {
            console.error("Failed to parse response:", e);
          }
        }
      },
      error: function (xhr, status, error) {
        saveButton.classList.remove("loading");
        console.error("AJAX Error:", { xhr, status, error }); // Log error details
        alert("Unable to save CSS. Please check console for details.");
      },
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((input) => {
    input.addEventListener("change", (e) => {
      console.log(e.target.value);
      const iframe = document.getElementById("previewFrame");
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      // Get the current style content
      const currentStyleUnparsed = doc.querySelector("style")?.innerHTML || "";
      const currentStyle = new CSSStyleSheet();
      currentStyle.replaceSync(currentStyleUnparsed);

      // Create new CSS content
      const newRules = Array.from(currentStyle.cssRules)
        .map((rule) => {
          if (rule.selectorText === e.target.attributes.rule_selector) {
            if (!rule.style) {
              rule.style = document.createElement("div").style;
            }
            rule.style.setProperty(
              e.target.attributes.property,
              e.target.value +
                ((e.target.attributes.property &&
                  [
                    ...allowedProperties.basic,
                    ...allowedProperties.advanced,
                  ].find(
                    (prop) => prop.property === e.target.attributes.property
                  )?.unit) ||
                  "")
            );
          }
          return rule.cssText;
        })
        .join("\n");

      // Update both the iframe and current style content
      currentStyleContent = newRules;

      restartIframe(iframe);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const advancedModeToggle = document.getElementById("advanced-mode-toggle");
  advancedModeToggle?.addEventListener("change", function () {
    isAdvanced = !isAdvanced;
    generateOptions(currentStyleContent);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const resetLoaderButton = document.getElementById("reset-loader-button");
  resetLoaderButton?.addEventListener("click", function (e) {
    e.preventDefault();
    const iframe = document.getElementById("previewFrame");
    if (
      confirm(
        "Are you sure you want to reset the loader? All changes will be lost."
      )
    ) {
      currentStyleContent = initialStyle;
      generateOptions(currentStyleContent);
      restartIframe(iframe);
    }
  });
});

// Prevent form from submitting
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("elegant-options");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      return false;
    });
  }
});
