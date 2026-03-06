var results = {};

// Get CSS custom properties (variables) from root
var rootStyles = getComputedStyle(document.documentElement);
results.cssVars = {
  colorMainHover: rootStyles.getPropertyValue("--lvv-color-main-hover").trim(),
  colorFillTransparencyHover: rootStyles.getPropertyValue("--lvv-color-fill-transparency-hover").trim(),
  colorTextPrimary: rootStyles.getPropertyValue("--lvv-color-text-primary").trim(),
  colorTextSecondary: rootStyles.getPropertyValue("--lvv-color-text-secondary").trim(),
  colorTextContentPrimary: rootStyles.getPropertyValue("--lvv-color-text-content-primary").trim(),
};

// Simulate hover on toolbar button to get hover bg
var toolbarBtn = document.querySelector(".toolbar-button-scI9YR");
if (toolbarBtn) {
  // Dispatch mouseenter
  toolbarBtn.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
  toolbarBtn.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  // Wait a tick then read
  var cs = getComputedStyle(toolbarBtn);
  results.toolbarBtnHover = {
    note: "hover state may need CSS :hover pseudo which we cant trigger via JS",
  };
}

// Get hover selectors specific to our elements from CSS
var hoverStyles = [];
try {
  for (var s = 0; s < document.styleSheets.length; s++) {
    try {
      var sheet = document.styleSheets[s];
      var rules = sheet.cssRules || sheet.rules;
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (rule.selectorText && rule.selectorText.includes(":hover")) {
          var sel = rule.selectorText;
          if (sel.includes("reference") || sel.includes("toolbar-button") || sel.includes("submit-button") || sel.includes("toolbar-select") || sel.includes("button-MPKZEw")) {
            hoverStyles.push({
              selector: sel.substring(0, 200),
              css: rule.cssText.substring(0, 400)
            });
          }
        }
      }
    } catch(e) {}
  }
} catch(e) {}
results.specificHoverRules = hoverStyles;

// Also check for reference-upload hover
var uploadHoverStyles = [];
try {
  for (var s2 = 0; s2 < document.styleSheets.length; s2++) {
    try {
      var sheet2 = document.styleSheets[s2];
      var rules2 = sheet2.cssRules || sheet2.rules;
      for (var r2 = 0; r2 < rules2.length; r2++) {
        var rule2 = rules2[r2];
        if (rule2.selectorText && (rule2.selectorText.includes("reference-upload") || rule2.selectorText.includes("reference-item") || rule2.selectorText.includes("reference-group"))) {
          uploadHoverStyles.push({
            selector: rule2.selectorText.substring(0, 200),
            css: rule2.cssText.substring(0, 500)
          });
        }
      }
    } catch(e) {}
  }
} catch(e) {}
results.uploadRelatedRules = uploadHoverStyles.slice(0, 15);

JSON.stringify(results, null, 2);
