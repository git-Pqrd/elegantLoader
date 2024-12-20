function restartAnimation(iframe) {
  if (!iframe) return;

  try {
    // Get the iframe document
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Store the current content
    const currentStyleContent =
      iframeDoc.querySelector("style")?.innerHTML || "";
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

let lastChange = null;
function handleChange() {
  let iframe = document.getElementById("previewFrame");
  let styleContent = iframe.contentDocument.querySelector("style")?.innerHTML;
  console.log("handleChange");
  lastChange = lastChange || 0;
  const now = Date.now();
  if (now - lastChange > 1000) {
    parseOptionsAndModifyStyle(styleContent, iframe);
    restartAnimation(iframe);
  }
  lastChange = now;
}

function parseOptionsAndModifyStyle() {
  let iframe = document.getElementById("previewFrame");
  let styleContent = iframe.contentDocument.querySelector("style")?.innerHTML;
  try {
    if (!styleContent) return;

    // Create a new stylesheet object
    const tempStyle = document.createElement("style");
    tempStyle.textContent = styleContent;

    // Parse and modify the style content
    const css = new CSSStyleSheet();
    css.replaceSync(tempStyle.textContent);

    // Modify the first rule (for demonstration purposes)
    const style = css.cssRules[0];
    style.style.setProperty("background-color", "red");

    // Update the global styleContent variable
    styleContent = Array.from(css.cssRules)
      .map((rule) => rule.cssText)
      .join("\n");

    // Apply the updated style back to the iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const iframeStyle = iframeDoc.querySelector("style");
    if (iframeStyle) {
      iframeStyle.innerHTML = styleContent;
    }
  } catch (error) {
    console.error("Error modifying style:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const iframe = document.getElementById("previewFrame");
  const restartAnimationButton = document.getElementById(
    "restart-animation-button"
  );

  let styleContent = "";

  if (iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    styleContent = iframeDoc.querySelector("style")?.innerHTML || "";
  }

  restartAnimationButton?.addEventListener("click", function () {
    parseOptionsAndModifyStyle(styleContent, iframe);
    restartAnimation(iframe);
  });
});
