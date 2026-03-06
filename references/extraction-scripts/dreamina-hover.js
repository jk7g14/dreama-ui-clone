var results = {};

// Get all hover-related CSS rules from stylesheets
var hoverRules = [];
try {
  for (var s = 0; s < document.styleSheets.length; s++) {
    try {
      var sheet = document.styleSheets[s];
      var rules = sheet.cssRules || sheet.rules;
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (rule.selectorText && rule.selectorText.includes(":hover")) {
          // Filter for our relevant classes
          var sel = rule.selectorText;
          if (sel.includes("toolbar-button") || sel.includes("submit-button") || sel.includes("reference-upload") || sel.includes("toolbar-select") || sel.includes("lv-btn") || sel.includes("lv-select")) {
            hoverRules.push({
              selector: sel.substring(0, 150),
              styles: rule.cssText.substring(0, 300)
            });
          }
        }
      }
    } catch(e) {}
  }
} catch(e) {}

results.hoverRules = hoverRules.slice(0, 20);

// Check transition properties on key elements
var uploadBtn = document.querySelector(".reference-upload-_BLH8k");
if (uploadBtn) {
  var cs = getComputedStyle(uploadBtn);
  results.uploadTransition = cs.transition;
}

var submitBtn = document.querySelector(".submit-button-WMGapN");
if (submitBtn) {
  var cs2 = getComputedStyle(submitBtn);
  results.submitTransition = cs2.transition;
}

var toolbarBtns = document.querySelectorAll(".toolbar-button-scI9YR");
if (toolbarBtns.length > 0) {
  var cs3 = getComputedStyle(toolbarBtns[0]);
  results.toolbarBtnTransition = cs3.transition;
}

var selects = document.querySelectorAll(".toolbar-select-OTtrfP");
if (selects.length > 0) {
  var cs4 = getComputedStyle(selects[0]);
  results.selectTransition = cs4.transition;
}

// Check collapse transition on the main container
var generator = document.querySelector("[class*='content-generator']");
if (generator) {
  var cs5 = getComputedStyle(generator);
  results.generatorTransition = cs5.transition;
  var style = generator.getAttribute("style");
  results.generatorCSSVars = style ? style.substring(0, 300) : null;
}

JSON.stringify(results, null, 2);
