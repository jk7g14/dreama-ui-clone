var results = {};

// Card inner layout padding
var layout = document.querySelector(".layout-q8z7dj");
if (layout) {
  var cs = getComputedStyle(layout);
  results.layout = { padding: cs.padding, margin: cs.margin, gap: cs.gap, display: cs.display, flexDirection: cs.flexDirection };
}

// Content area (references + main + submit)
var content = document.querySelector(".content-Nt6Sal");
if (content) {
  var cs2 = getComputedStyle(content);
  results.content = { padding: cs2.padding, margin: cs2.margin, gap: cs2.gap, display: cs2.display, flexDirection: cs2.flexDirection, height: cs2.height, alignItems: cs2.alignItems };
}

// References area
var refs = document.querySelector(".references-J7qGTB");
if (refs) {
  var cs3 = getComputedStyle(refs);
  results.references = { width: cs3.width, height: cs3.height, padding: cs3.padding, margin: cs3.margin, flexShrink: cs3.flexShrink };
}

// Main content (textarea area)
var main = document.querySelector(".main-content-KtGkoD");
if (main) {
  var cs4 = getComputedStyle(main);
  results.mainContent = { width: cs4.width, height: cs4.height, padding: cs4.padding, margin: cs4.margin, flex: cs4.flex, overflow: cs4.overflow };
}

// Prompt container
var prompt = document.querySelector(".prompt-container-srFK3k");
if (prompt) {
  var cs5 = getComputedStyle(prompt);
  results.promptContainer = { padding: cs5.padding, margin: cs5.margin, height: cs5.height, minHeight: cs5.minHeight, maxHeight: cs5.maxHeight };
}

// Submit area (collapsed)
var submitArea = document.querySelector(".collapsed-submit-button-container-GSpUeN");
if (submitArea) {
  var cs6 = getComputedStyle(submitArea);
  results.submitArea = { padding: cs6.padding, margin: cs6.margin, gap: cs6.gap, display: cs6.display, alignItems: cs6.alignItems, flexDirection: cs6.flexDirection, width: cs6.width };
}

// Toolbar container
var toolbarContainer = document.querySelector(".container-A7bCsQ");
if (toolbarContainer) {
  var cs7 = getComputedStyle(toolbarContainer);
  results.toolbarContainer = { padding: cs7.padding, margin: cs7.margin, gap: cs7.gap, display: cs7.display, justifyContent: cs7.justifyContent, alignItems: cs7.alignItems, height: cs7.height };
}

// Toolbar left (settings content)
var toolbarLeft = document.querySelector(".toolbar-settings-content-AvgURE");
if (toolbarLeft) {
  var cs8 = getComputedStyle(toolbarLeft);
  results.toolbarLeft = { padding: cs8.padding, margin: cs8.margin, gap: cs8.gap, display: cs8.display, alignItems: cs8.alignItems };
}

// Toolbar right (actions)
var toolbarRight = document.querySelector(".toolbar-actions-lxWY6i");
if (toolbarRight) {
  var cs9 = getComputedStyle(toolbarRight);
  results.toolbarRight = { padding: cs9.padding, margin: cs9.margin, gap: cs9.gap, display: cs9.display, alignItems: cs9.alignItems };
}

// Overall dimensions
var generator = document.querySelector("[class*='content-generator']");
if (generator) {
  var cs10 = getComputedStyle(generator);
  results.generator = { width: cs10.width, height: cs10.height, padding: cs10.padding };
}

// Toolbar itself
var toolbar = document.querySelector(".toolbar-f_4lTy");
if (toolbar) {
  var cs11 = getComputedStyle(toolbar);
  results.toolbar = { padding: cs11.padding, margin: cs11.margin, gap: cs11.gap, height: cs11.height, justifyContent: cs11.justifyContent };
}

// Select view (inner of select trigger)
var selectViews = document.querySelectorAll(".lv-select-view");
selectViews.forEach(function(sv, i) {
  var cs12 = getComputedStyle(sv);
  results["selectView_" + i] = { padding: cs12.padding, height: cs12.height, borderRadius: cs12.borderRadius, gap: cs12.gap };
});

JSON.stringify(results, null, 2);
