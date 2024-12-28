let currentStyleContent = "";
let initialStyle = "";
let isAdvanced = false;

const defaultValues = {
  "background-color": "#ffffff",
  color: "#000000",
  width: "100%",
  height: "100%",
  "border-radius": "0px",
  stroke: "#000000",
  fill: "#000000",
  "background-image": "none",
  overflow: "visible",
  "border-color": "#000000",
  "border-width": "0px",
  margin: "0px",
  padding: "0px",
  "animation-name": "none",
  "font-size": "16px",
  "font-weight": "400",
  "text-align": "left",
  "text-transform": "none",
  "animation-duration": "1s",
  "animation-iteration-count": "1",
  "animation-timing-function": "linear",
  "stroke-color": "#000000",
  "stroke-dasharray": "0",
  "stroke-dashoffset": "0",
  "stroke-width": "1px",
  "stroke-linecap": "butt",
};

const allowedProperties = {
  basic: [
    {
      property: "background-color",
      label: "Background Color",
      type: "color",
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
      property: "background",
      label: "Background Gradient",
      type: "gradient",
      category: "appearance",
      unit: "",
    },
    {
      property: "overflow",
      label: "Overflow",
      type: "select",
      options: ["visible", "hidden", "scroll", "auto"],
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

/** Keeps the rules that are editable */
function filteredCssRules(rules) {
  return Array.from(rules).filter(
    (rule) => !rule.cssText.includes("@keyframes")
  );
}

function createInputField(rule, propertyInfo) {
  const currentValue =
    rule.style.getPropertyValue(propertyInfo.property) ||
    defaultValues[propertyInfo.property] ||
    "initial";

  const childDiv = document.createElement("div");
  childDiv.className =
    "flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200";

  // Add a wrapper for the input and ignore button
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "flex items-center gap-2 h-10";

  const iframe = document.getElementById("previewFrame");
  // Create ignore button
  const ignoreButton = document.createElement("button");
  ignoreButton.innerHTML = "\u274C";
  ignoreButton.className =
    "px-2 h-full mr-2 text-gray-500 hover:text-red-500 font-bold text-sm transition-colors duration-200";
  ignoreButton.title = "Remove this property";
  ignoreButton.attributes = {
    rule_selector: rule.selectorText,
    property: propertyInfo.property,
  };
  ignoreButton.addEventListener("click", function () {
    rule.style.removeProperty(propertyInfo.property);

    // Update currentStyleContent
    const css = new CSSStyleSheet();
    css.replaceSync(currentStyleContent);
    currentStyleContent = Array.from(css.cssRules)
      .map((r) => {
        if (r.selectorText === rule.selectorText) {
          return rule.cssText;
        }
        return r.cssText;
      })
      .join("\n");

    // Regenerate options and restart iframe
    generateOptions(currentStyleContent);
    restartIframe(iframe);
  });

  // create a button to reset the property initial value
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "↺";
  resetButton.className =
    "px-2 py-1 text-gray-500 hover:text-blue-500 font-bold text-xl transition-colors duration-200";
  resetButton.title = "Reset this property to its initial value";
  resetButton.addEventListener("click", function () {
    // Get the initial value from the initialStyle
    const initialValue = getInitialValue(
      rule.selectorText,
      propertyInfo.property
    );

    if (initialValue) {
      rule.style.setProperty(propertyInfo.property, initialValue);

      // Update currentStyleContent
      const css = new CSSStyleSheet();
      css.replaceSync(currentStyleContent);
      currentStyleContent = Array.from(css.cssRules)
        .map((r) => {
          if (r.selectorText === rule.selectorText) {
            return rule.cssText;
          }
          return r.cssText;
        })
        .join("\n");

      // Regenerate options and restart iframe
      generateOptions(currentStyleContent);
      restartIframe(iframe);
    }
  });

  const label = document.createElement("label");
  label.textContent = propertyInfo.label + ": ";
  label.style.setProperty("min-width", "150px");
  label.style.setProperty("min-height", "30px");
  label.className =
    "w-1/3 text-md font-semibold text-gray-700 items-center flex";

  let input;

  if (propertyInfo.type === "select") {
    input = document.createElement("select");
    input.className =
      "w-44 h-10 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
    propertyInfo.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      optionElement.selected = option === currentValue;
      input.appendChild(optionElement);
    });
  } else if (propertyInfo.type === "color") {
    input = document.createElement("input");
    input.type = "color";
    input.value = currentValue;
    input.className =
      "p-1 h-10 w-14 block bg-white border border-gray-300 cursor-pointer rounded-lg shadow-sm transition-all duration-200" +
      " disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700";
  } else if (propertyInfo.type === "gradient") {
    input = createGradientDiv(propertyInfo, rule, currentValue);
  } else if (propertyInfo.type === "range") {
    input = createRangeInput(propertyInfo, rule, currentValue);
  } else {
    input = document.createElement("input");
    input.type = propertyInfo.type;
    input.className =
      "h-10 w-44 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
  }
  if (input.type !== "select" && !input.value) {
    input.value = currentValue;
  }
  input.attributes.rule_selector = rule.selectorText;
  input.attributes.property = propertyInfo.property;
  // create a wrapper for the label and the buttons
  const labelWrapper = document.createElement("div");
  labelWrapper.className = "flex items-center gap-2 align-middle";
  const initialValue = getInitialValue(
    rule.selectorText,
    propertyInfo.property
  );
  if (initialValue && initialValue !== currentValue) {
    labelWrapper.appendChild(resetButton);
  }
  labelWrapper.appendChild(ignoreButton);
  labelWrapper.appendChild(label);
  childDiv.appendChild(labelWrapper);

  // Add visual indicator if property is set to initial or default value
  if (
    currentValue === "initial" ||
    currentValue === defaultValues[propertyInfo.property]
  ) {
    inputWrapper.classList.add("opacity-50");
    // Not adding to the ctas
    childDiv.lastElementChild.classList.add("opacity-50");
  }
  // add input to the input wrapper
  inputWrapper.appendChild(input);

  childDiv.appendChild(inputWrapper);

  return childDiv;
}

function createGradientDiv(propertyInfo, rule, value) {
  const childDiv = document.createElement("div");
  childDiv.className =
    "flex items-center justify-end w-full gap-2 parent-gradient";

  const colorRegex =
    /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})|rgba?\(\s*(\d{1,3}\s*,\s*){2,3}\d{1,3}\s*(,\s*\d+(\.\d+)?\s*)?\)/g;

  const colors = value.match(colorRegex) || [];
  colors.forEach((color) => {
    color = rbgToHex(color);
    const colorInput = createGradientInput(propertyInfo, rule, color);
    childDiv.appendChild(colorInput);
    childDiv.appendChild(colorInput);
    colorInput.addEventListener(["change"], function (e) {
      console.log("colorInput", colorInput);
      handleInputChange(e);
    });
  });
  if (childDiv.children.length < 4) {
    const plusButton = document.createElement("button");
    plusButton.innerHTML = "+";
    plusButton.className =
      "px-2 py-1 text-gray-500 hover:text-blue-500 font-bold text-xl transition-colors duration-200";
    plusButton.addEventListener("click", function () {
      const newInput = createGradientInput(propertyInfo, rule, "#000000");
      newInput.addEventListener(["change"], function (e) {
        handleInputChange(e);
      });
      childDiv.insertBefore(newInput, childDiv.lastElementChild);
      newInput.dispatchEvent(new Event("change", { target: newInput }));
    });
    childDiv.appendChild(plusButton);
  }
  return childDiv;
}

function createGradientInput(propertyInfo, rule, value) {
  const wrapper = document.createElement("div");
  wrapper.attributes.property = propertyInfo.property;
  wrapper.attributes.rule_selector = rule.selectorText;
  wrapper.className = "gradient-wrapper relative";

  const input = document.createElement("input");
  input.attributes.property = propertyInfo.property;
  input.attributes.rule_selector = rule.selectorText;
  input.type = "color";
  input.value = value;
  input.className =
    "p-1 h-10 w-14 block bg-white border border-gray-300 cursor-pointer rounded-lg shadow-sm transition-all duration-200" +
    " disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700";

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "×";
  deleteButton.className =
    "absolute -top-1 -right-1 w-3 h-3 text-xs font-bold bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer";
  deleteButton.addEventListener("click", (e) => {
    wrapper.remove();
    handleInputChange(e);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(deleteButton);
  return wrapper;
}

function createRangeInput(propertyInfo, rule, value) {
  const input = document.createElement("input");
  input.type = "range";
  input.min = propertyInfo.min;
  input.max = propertyInfo.max;
  input.attributes.rule_selector = rule.selectorText;
  input.attributes.property = propertyInfo.property;
  input.className =
    "h-2 w-44 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg appearance-none cursor-pointer";
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

function rbgToHex(rgb) {
  if (rgb.startsWith("#")) return rgb;
  const rgbArray = rgb.match(/\d+/g);
  const hex = rgbArray
    .map((value) => {
      const hexValue = parseInt(value).toString(16);
      return hexValue.length === 1 ? `0${hexValue}` : hexValue;
    })
    .join("");
  return `#${hex}`;
}

function generateOptions(currentStyleContent) {
  const optionsContainer = document.getElementById("elegant-options-container");
  if (!optionsContainer) return;

  const css = new CSSStyleSheet();
  css.replaceSync(currentStyleContent);
  optionsContainer.innerHTML = "";

  // Create input fields based on CSS properties
  Array.from(filteredCssRules(css.cssRules)).forEach((rule) => {
    let parentDiv = document.createElement("div");

    // Create section title
    parentDiv.className =
      "flex items-start flex-col justify-between w-full my-6 pb-4 bg-white rounded-xl shadow-sm p-4";
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = rule?.selectorText;
    sectionTitle.className =
      "text-2xl font-semibold text-gray-800 py-3 w-full border-b border-gray-200 mb-4";
    parentDiv.appendChild(sectionTitle);

    const allProperties = [
      ...allowedProperties.basic,
      ...(isAdvanced ? allowedProperties.advanced : []),
    ];
    Array.from(allProperties).forEach((property) => {
      const inputField = createInputField(rule, property);
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

function getInitialValue(selector, property) {
  const css = new CSSStyleSheet();
  css.replaceSync(initialStyle);
  return Array.from(css.cssRules)
    .find((rule) => rule.selectorText === selector)
    ?.style.getPropertyValue(property);
}

/** Set the value to the new value with the unit and by string interpolation for the gradient */
function calculateNewValue(target) {
  const propertyInfo = [
    ...allowedProperties.basic,
    ...allowedProperties.advanced,
  ].find((prop) => prop.property === target.attributes.property);
  if (propertyInfo.type === "gradient") {
    const parentDiv = target.closest(".parent-gradient");
    console.log(parentDiv);
    const colors = Array.from(parentDiv.querySelectorAll("input")).map(
      (child) => child.value
    );
    console.log(colors);
    if (colors.length === 1) {
      return `linear-gradient(90deg, ${colors[0]} 0%, ${colors[0]} 100%)`;
    }
    const newGradient = `linear-gradient(90deg, ${colors
      .map(
        (color, index) =>
          `${color} ${
            isNaN((index * 100) / (colors.length - 1))
              ? 100
              : (index * 100) / (colors.length - 1)
          }%`
      )
      .join(", ")})`;
    return newGradient;
  } else {
    return (
      target.value +
      ((target.attributes.property &&
        [...allowedProperties.basic, ...allowedProperties.advanced].find(
          (prop) => prop.property === target.attributes.property
        )?.unit) ||
        "")
    );
  }
}

/** Handle the input change
 * @param {Event} e - The event object
 */
function handleInputChange(e) {
  const iframe = document.getElementById("previewFrame");
  const doc = iframe.contentDocument || iframe.contentWindow.document;

  // Get the current style content
  const currentStyleUnparsed = doc.querySelector("style")?.innerHTML || "";
  const currentStyle = new CSSStyleSheet();
  currentStyle.replaceSync(currentStyleUnparsed);

  // Create new CSS content
  let newRules = Array.from(currentStyle.cssRules)
    .map((rule) => {
      if (rule.cssText.includes("@keyframes")) return rule.cssText;
      if (rule.selectorText === e.target.attributes.rule_selector) {
        const newValue = calculateNewValue(e.target);
        console.log(
          `Changing ${e.target.attributes.property} to ${newValue} of rule ${rule.selectorText}`
        );
        if (!rule.style) {
          rule.style = document.createElement("div").style;
        }
        rule.style.setProperty(e.target.attributes.property, newValue);
      }
      return rule.cssText;
    })
    .join("\n");

  // Update both the iframe and current style content
  currentStyleContent = newRules;
  generateOptions(currentStyleContent);
  restartIframe(iframe);
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
    input.addEventListener(["change", "input"], (e) => {
      handleInputChange(e);
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
