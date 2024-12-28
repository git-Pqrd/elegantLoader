let currentStyleContent = "";
let initialStyle = "";
let isAdvanced = false;

// Default values for certain CSS properties.
// If a property is set to this value or "initial", we consider it "unused".
const defaultValues = {
  "background-color": "#ffffff",
  color: "#000000",
  width: "100%",
  height: "100%",
  "border-radius": "0%",
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

/**
 * GROUPED PROPERTIES
 *
 * We now group properties under high-level headings (e.g., “Background”, “Size”, etc.)
 * Each group is an object with:
 *   - group: The name (string)
 *   - properties: An array of property objects (property, label, type, etc.)
 */
const allowedProperties = {
  basic: [
    {
      group: "Background",
      showFor: ["container"],
      properties: [
        {
          property: "background",
          label: "Background Gradient",
          type: "gradient",
          category: "appearance",
          unit: "",
        },
        {
          property: "background-color",
          label: "Background Color",
          type: "color",
          category: "appearance",
          unit: "",
        },
      ],
    },
    {
      group: "Path",
      showFor: ["path"],
      properties: [
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
      ],
    },
    {
      group: "Size",
      showFor: ["svg"],
      properties: [
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
      ],
    },
    {
      group: "Animation",
      showFor: ["*"],
      properties: [
        {
          property: "animation-duration",
          label: "Animation Duration",
          type: "range",
          min: 0,
          max: 10,
          category: "animation",
          unit: "s",
        },
        {
          property: "animation-timing-function",
          label: "Animation Timing",
          type: "select",
          options: ["linear", "ease", "ease-in", "ease-out", "ease-in-out"],
          category: "animation",
          unit: "",
        },
      ],
    },
  ],
  advanced: [
    {
      group: "Appearance",
      showFor: ["svg"],
      properties: [
        // {
        //   property: "color",
        //   label: "Text Color",
        //   type: "color",
        //   category: "appearance",
        //   unit: "",
        // },
        // {
        //   property: "overflow",
        //   label: "Overflow",
        //   type: "select",
        //   options: ["visible", "hidden", "scroll", "auto"],
        //   category: "appearance",
        //   unit: "",
        // },
        {
          property: "display",
          label: "Display",
          type: "select",
          options: ["block", "none"],
          category: "appearance",
          unit: "",
        },
        {
          property: "border-radius",
          label: "Border Radius",
          type: "range",
          min: 0,
          max: 100,
          category: "appearance",
          unit: "%",
        },
      ],
    },
    {
      group: "Spacing",
      showFor: ["*"],
      properties: [
        {
          property: "margin",
          label: "Margin",
          type: "range",
          min: 0,
          max: 100,
          category: "spacing",
          unit: "px",
        },
        {
          property: "padding",
          label: "Padding",
          type: "range",
          min: 0,
          max: 100,
          category: "spacing",
          unit: "px",
        },
      ],
    },
    {
      group: "Border",
      showFor: ["*"],
      properties: [
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
          type: "range",
          min: 0,
          max: 10,
          category: "border",
          unit: "px",
        },
      ],
    },
    // {
    //   group: "Typography",
    //   showFor: ["*"],
    //   properties: [
    //     {
    //       property: "font-size",
    //       label: "Font Size",
    //       type: "range",
    //       min: 0,
    //       max: 100,
    //       category: "typography",
    //       unit: "px",
    //     },
    //     {
    //       property: "font-weight",
    //       label: "Font Weight",
    //       type: "range",
    //       min: 100,
    //       max: 900,
    //       category: "typography",
    //       unit: "",
    //     },
    //     {
    //       property: "text-align",
    //       label: "Text Align",
    //       type: "select",
    //       options: ["left", "center", "right"],
    //       category: "typography",
    //       unit: "",
    //     },
    //     {
    //       property: "text-transform",
    //       label: "Text Transform",
    //       type: "select",
    //       options: ["none", "uppercase", "lowercase", "capitalize"],
    //       category: "typography",
    //       unit: "",
    //     },
    //   ],
    // },
    {
      group: "SVG (Advanced)",
      showFor: ["svg"],
      properties: [
        {
          property: "stroke-dasharray",
          label: "Stroke Dash Array",
          type: "range",
          min: 0,
          max: 100,
          category: "svg",
          unit: "px",
        },
        {
          property: "stroke-dashoffset",
          label: "Stroke Dash Offset",
          type: "range",
          min: 0,
          max: 100,
          category: "svg",
          unit: "px",
        },
        {
          property: "stroke-width",
          label: "Stroke Width",
          type: "range",
          min: 0,
          max: 10,
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
    },
  ],
};

/** Keeps the rules that are editable */
function filteredCssRules(rules) {
  return Array.from(rules).filter(
    (rule) => !rule.cssText.includes("@keyframes")
  );
}

/**
 * Creates the UI for each property (label + input(s)).
 * We add a small "Used" checkmark if currentValue differs
 * from default/initial.
 */
function createInputField(rule, propertyInfo) {
  // Check if property is set or still default/initial
  const currentValue =
    rule.style.getPropertyValue(propertyInfo.property) ||
    defaultValues[propertyInfo.property] ||
    "initial";
  const isPropertySet = currentValue !== "" && currentValue !== "initial";

  const childDiv = document.createElement("div");
  childDiv.className =
    "flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200";

  // If this property is "used", highlight row or add a checkmark
  if (isPropertySet) {
    // You could highlight the background or border
    childDiv.classList.add("bg-green-50");
  }

  // A wrapper for the input (or gradient inputs)
  const inputWrapper = document.createElement("div");
  inputWrapper.className = "flex items-center gap-2 h-10";

  // The "ignore" (remove) button
  const iframe = document.getElementById("previewFrame");
  const ignoreButton = document.createElement("button");
  ignoreButton.innerHTML = "\u274C";
  ignoreButton.className =
    "px-2 h-full mr-2 text-gray-500 hover:text-red-500 font-bold text-sm transition-colors duration-200";
  ignoreButton.title = "Remove this property";
  ignoreButton.setAttribute("rule_selector", rule.selectorText);
  ignoreButton.setAttribute("property", propertyInfo.property);
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

    generateOptions(currentStyleContent);
    restartIframe(iframe);
  });

  // Reset button
  const resetButton = document.createElement("button");
  resetButton.innerHTML = "↺";
  resetButton.className =
    "px-2 py-1 text-gray-500 hover:text-blue-500 font-bold text-xl transition-colors duration-200";
  resetButton.title = "Reset this property to its initial value";
  resetButton.addEventListener("click", function () {
    const initVal = getInitialValue(rule.selectorText, propertyInfo.property);
    if (initVal) {
      rule.style.setProperty(propertyInfo.property, initVal);

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

      generateOptions(currentStyleContent);
      restartIframe(iframe);
    }
  });

  // Label
  const label = document.createElement("label");
  label.textContent = propertyInfo.label + ": ";
  label.style.setProperty("min-width", "150px");
  label.style.setProperty("min-height", "30px");
  label.className =
    "w-1/3 text-md font-semibold text-gray-700 items-center flex";

  // Determine which input to create
  let input;
  if (propertyInfo.type === "select") {
    input = document.createElement("select");
    input.setAttribute("rule_selector", rule.selectorText);
    input.setAttribute("property", propertyInfo.property);
    input.addEventListener("change", handleInputChange);
    input.className =
      "w-44 h-10 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
    propertyInfo.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      if (option === currentValue.trim()) {
        optionElement.selected = true;
      }
      input.appendChild(optionElement);
    });
  } else if (propertyInfo.type === "color") {
    console.log("Property is color", currentValue);
    input = createColorInput(propertyInfo, rule, currentValue);
  } else if (propertyInfo.type === "gradient") {
    input = createGradientDiv(propertyInfo, rule, currentValue);
  } else if (propertyInfo.type === "range") {
    input = createRangeInput(propertyInfo, rule, currentValue);
  } else {
    // Default: e.g. type="text", etc.
    input = document.createElement("input");
    input.type = propertyInfo.type;
    input.className =
      "h-10 w-44 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
    input.value = currentValue;
  }

  // Make sure the input has references to the rule & property
  input.setAttribute("rule_selector", rule.selectorText);
  input.setAttribute("property", propertyInfo.property);

  // Label + Buttons Container
  const labelWrapper = document.createElement("div");
  labelWrapper.className = "flex items-center gap-2 align-middle";

  // If the initial value is different, show reset button
  const initVal = getInitialValue(rule.selectorText, propertyInfo.property);
  if (initVal && initVal !== currentValue) {
    labelWrapper.appendChild(resetButton);
  }
  labelWrapper.appendChild(ignoreButton);
  labelWrapper.appendChild(label);
  childDiv.appendChild(labelWrapper);

  // Dim the input if it’s “initial” or default
  if (!isPropertySet) {
    inputWrapper.classList.add("opacity-50");
    childDiv.lastElementChild?.classList.add("opacity-50");
  }

  inputWrapper.appendChild(input);
  childDiv.appendChild(inputWrapper);

  return childDiv;
}

/** Create a color input for "background: color" */
function createColorInput(propertyInfo, rule, value) {
  const input = document.createElement("input");
  input.type = "color";
  input.value = rbgToHex(value);
  input.className =
    "p-1 h-10 w-14 block bg-white border border-gray-300 cursor-pointer rounded-lg shadow-sm transition-all duration-200" +
    " disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700";
  input.setAttribute("rule_selector", rule.selectorText);
  input.setAttribute("property", propertyInfo.property);
  input.addEventListener("change", handleInputChange);
  return input;
}

/** Create gradient color inputs for "background: linear-gradient(...)" */
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
    colorInput.addEventListener("change", handleInputChange);
  });

  // Optionally limit # of color stops. Right now, we allow up to x stops + a button.
  if (childDiv.children.length < 6) {
    const plusButton = document.createElement("button");
    plusButton.innerHTML = "+";
    plusButton.className =
      "px-2 py-1 text-gray-500 hover:text-blue-500 font-bold text-xl transition-colors duration-200";
    plusButton.addEventListener("click", function () {
      const newInput = createGradientInput(propertyInfo, rule, "#000000");
      newInput.addEventListener("change", handleInputChange);
      childDiv.insertBefore(newInput, childDiv.lastElementChild);
      // Trigger change so the gradient is recalculated
      newInput.dispatchEvent(new Event("change"));
    });
    childDiv.appendChild(plusButton);
  }

  return childDiv;
}

function createGradientInput(propertyInfo, rule, value) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("property", propertyInfo.property);
  wrapper.setAttribute("rule_selector", rule.selectorText);
  wrapper.className = "gradient-wrapper relative";

  const input = document.createElement("input");
  input.setAttribute("property", propertyInfo.property);
  input.setAttribute("rule_selector", rule.selectorText);
  input.type = "color";
  input.value = value;
  input.className =
    "p-1 h-10 w-14 block bg-white border border-gray-300 cursor-pointer rounded-lg shadow-sm transition-all duration-200" +
    " disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700";

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "×";
  deleteButton.className =
    "absolute -top-1 -right-1 w-3 h-3 text-xs font-bold bg-red-600 text-white rounded-full flex items-center justify-center cursor-pointer";
  deleteButton.addEventListener("click", () => {
    const parentDiv = wrapper.closest(".parent-gradient");
    wrapper.remove();

    // Create a new event with the necessary properties
    const remainingInput = parentDiv.querySelector("input");
    const syntheticEvent = new Event("change");
    syntheticEvent.target = remainingInput;

    // Manually add the required attributes
    Object.defineProperties(syntheticEvent, {
      target: {
        value: remainingInput,
        writable: false,
      },
    });

    handleInputChange(syntheticEvent);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(deleteButton);
  return wrapper;
}

/** Create a "range + numeric" combined input for easier UX. */
function createRangeInput(propertyInfo, rule, value) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex items-center gap-2";

  const input = document.createElement("input");
  input.type = "range";
  input.min = propertyInfo.min;
  input.max = propertyInfo.max;
  input.setAttribute("rule_selector", rule.selectorText);
  input.setAttribute("property", propertyInfo.property);
  input.className =
    "h-2 w-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg appearance-none cursor-pointer";
  input.style.outline = "none";

  const numericInput = document.createElement("input");
  numericInput.type = "number";
  numericInput.min = propertyInfo.min;
  numericInput.max = propertyInfo.max;
  numericInput.setAttribute("rule_selector", rule.selectorText);
  numericInput.setAttribute("property", propertyInfo.property);
  numericInput.className =
    "w-16 h-10 px-2 py-1 text-sm bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  // Use the current value or fall back to 0 if invalid
  let initialValue = parseInt(value, 10) || 0;
  initialValue = Math.max(
    propertyInfo.min,
    Math.min(propertyInfo.max, initialValue)
  );

  input.value = String(initialValue);
  numericInput.value = String(initialValue);

  const unitLabel = document.createElement("span");
  unitLabel.textContent = propertyInfo.unit;
  unitLabel.className = "text-sm text-gray-600";

  // Sync range <-> numeric
  input.addEventListener("change", (e) => {
    numericInput.value = e.target.value;
    handleInputChange(e);
  });

  numericInput.addEventListener("input", (e) => {
    input.value = e.target.value;
    handleInputChange(e);
  });

  wrapper.appendChild(input);
  wrapper.appendChild(numericInput);
  wrapper.appendChild(unitLabel);

  return wrapper;
}

function rbgToHex(rgb) {
  if (rgb.startsWith("#")) return rgb;
  const rgbArray = rgb.match(/\d+/g);
  if (!rgbArray) return rgb; // Malformed string fallback
  const hex = rgbArray
    .map((value) => {
      const hexValue = parseInt(value, 10).toString(16);
      return hexValue.length === 1 ? `0${hexValue}` : hexValue;
    })
    .join("");
  return `#${hex}`;
}

/**
 * Generate the property editors for each CSS rule.
 * We now iterate groups, then each property in that group.
 */
function generateOptions(currentStyleContent) {
  const optionsContainer = document.getElementById("elegant-options-container");
  if (!optionsContainer) return;

  const css = new CSSStyleSheet();
  css.replaceSync(currentStyleContent);
  optionsContainer.innerHTML = "";

  // For each valid CSS rule, build out property controls
  Array.from(filteredCssRules(css.cssRules)).forEach((rule) => {
    const parentDiv = document.createElement("div");
    parentDiv.className =
      "flex items-start flex-col justify-between w-full my-6 pb-4 bg-white rounded-xl shadow-sm p-4";

    // Show the CSS selector at the top
    const sectionTitle = document.createElement("h2");
    sectionTitle.textContent = rule?.selectorText;
    sectionTitle.className =
      "text-2xl font-semibold text-gray-800 py-3 w-full border-b border-gray-200 mb-4";
    parentDiv.appendChild(sectionTitle);

    // Combine the basic groups if not advanced, or both if advanced
    const allGroups = isAdvanced
      ? [...allowedProperties.basic, ...allowedProperties.advanced]
      : [...allowedProperties.basic];

    // For each group, create a sub-section
    allGroups.forEach((groupObj) => {
      if (
        !rule.selectorText.includes(groupObj.showFor) &&
        !groupObj.showFor.includes("*")
      ) {
        return;
      }

      const groupContainer = document.createElement("div");
      groupContainer.className = "w-full my-2 pl-4 border-l-2 border-gray-200";

      // Create details/summary elements for collapsible group
      const details = document.createElement("details");
      details.className = "w-full";
      details.open = true; // Open by default

      const summary = document.createElement("summary");
      summary.textContent = groupObj.group;
      summary.className =
        "text-xl font-semibold mb-2 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200";
      details.appendChild(summary);

      // Create container for properties
      const propertiesContainer = document.createElement("div");
      propertiesContainer.className = "pl-4";

      // Now iterate the properties in this group
      groupObj.properties.forEach((property) => {
        const inputField = createInputField(rule, property);
        if (inputField) {
          propertiesContainer.appendChild(inputField);
        }
      });

      details.appendChild(propertiesContainer);
      groupContainer.appendChild(details);
      parentDiv.appendChild(groupContainer);
    });

    optionsContainer.appendChild(parentDiv);
  });
}

/** Rebuilds the iframe with updated CSS. */
function restartIframe(iframe) {
  if (!iframe) return;
  try {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const bodyContent = iframeDoc.body.innerHTML;

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

    // Force a reflow
    iframe.style.display = "none";
    // eslint-disable-next-line no-unused-expressions
    iframe.offsetHeight;
    iframe.style.display = "";
  } catch (error) {
    console.error("Error restarting iframe:", error);
    if (iframe.src) {
      iframe.src = iframe.src;
    }
  }
}

/** Retrieve the *initial* (original) value of a property, if any. */
function getInitialValue(selector, property) {
  const css = new CSSStyleSheet();
  css.replaceSync(initialStyle);
  return Array.from(css.cssRules)
    .find((rule) => rule.selectorText === selector)
    ?.style.getPropertyValue(property);
}

/** Decide how to interpret the new input value before applying it. */
function calculateNewValue(target) {
  const propertyInfo = [
    ...allowedProperties.basic.flatMap((g) => g.properties),
    ...allowedProperties.advanced.flatMap((g) => g.properties),
  ].find((prop) => prop.property === target.getAttribute("property"));

  if (!propertyInfo) return target.value;

  // If it's a gradient property, combine all child color inputs into a single gradient
  if (propertyInfo.type === "gradient") {
    const parentDiv = target.closest(".parent-gradient");
    const colors = Array.from(parentDiv.querySelectorAll("input")).map(
      (child) => child.value
    );
    if (colors.length === 1) {
      return `linear-gradient(90deg, ${colors[0]} 0%, ${colors[0]} 100%)`;
    }
    return `linear-gradient(90deg, ${colors
      .map((color, index) => `${color} ${(index * 100) / (colors.length - 1)}%`)
      .join(", ")})`;
  }

  // For non-gradient, append the unit if any
  return target.value + (propertyInfo.unit || "");
}

/**
 * Called whenever the user changes any input (color, range, text, etc.).
 * Applies the updated CSS to the iframe.
 */
function handleInputChange(e) {
  const iframe = document.getElementById("previewFrame");
  if (!iframe) return;

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  const currentStyleUnparsed = doc.querySelector("style")?.innerHTML || "";
  const currentStyle = new CSSStyleSheet();
  currentStyle.replaceSync(currentStyleUnparsed);

  currentStyleContent = Array.from(currentStyle.cssRules)
    .map((rule) => {
      if (rule.cssText.includes("@keyframes")) return rule.cssText;
      if (rule.selectorText === e.target.getAttribute("rule_selector")) {
        const newValue = calculateNewValue(e.target);
        console.log(
          `setting ${e.target.getAttribute("property")} to ${newValue}`
        );
        rule.style.setProperty(e.target.getAttribute("property"), newValue);
      }
      return rule.cssText;
    })
    .join("\n");
  generateOptions(currentStyleContent);
  restartIframe(iframe);
}

// -----------------------------------
// Initialization & Event Listeners
// -----------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("previewFrame");
  if (!iframe) return;

  // Capture the original <style> from the iframe as the "initial" style
  initialStyle =
    iframe.contentDocument?.querySelector("style")?.innerHTML || "";

  // Start with the initial style
  currentStyleContent = initialStyle;
  generateOptions(currentStyleContent);

  // Restart animation
  const restartIframeButton = document.getElementById(
    "restart-animation-button"
  );
  restartIframeButton?.addEventListener("click", () => restartIframe(iframe));

  // Save button
  const saveButton = document.getElementById("save-button");
  saveButton?.addEventListener("click", function (event) {
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
        alert(
          "The loader has been saved successfully. It might take up to 30 seconds to apply on your site."
        );
        // Reload the page without ?should_show_editor=true
        window.location.href =
          window.location.href.split("?")[0] +
          "?" +
          window.location.href
            .split("?")[1]
            .replace("should_show_editor=true", "");
      },
      error: function (xhr, status, error) {
        saveButton.classList.remove("loading");
        console.error("AJAX Error:", { xhr, status, error });
        alert("Unable to save CSS. Please check console for details.");
      },
    });
  });

  // Toggle Advanced mode
  const advancedModeToggle = document.getElementById("advanced-mode-toggle");
  advancedModeToggle?.addEventListener("change", function () {
    isAdvanced = !isAdvanced;
    generateOptions(currentStyleContent);
  });

  // Reset Loader
  const resetLoaderButton = document.getElementById("reset-loader-button");
  resetLoaderButton?.addEventListener("click", function (e) {
    e.preventDefault();
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

  // Prevent form submission
  const form = document.getElementById("elegant-options");
  form?.addEventListener("submit", (e) => e.preventDefault());
});
