var results = {};

// Get the outermost card with border-radius (the dark card)
var generator = document.querySelector("[class*='content-generator']");
if (generator) {
  var cs = getComputedStyle(generator);
  results.generator = {
    bg: cs.backgroundColor,
    border: cs.border,
    borderRadius: cs.borderRadius,
    backdropFilter: cs.backdropFilter,
    webkitBackdropFilter: cs.webkitBackdropFilter,
    padding: cs.padding,
    boxShadow: cs.boxShadow,
    width: cs.width,
    height: cs.height,
    overflow: cs.overflow,
  };
}

// Try the dimension-layout as outer card
var dimLayout = document.querySelector("[class*='dimension-layout']");
if (dimLayout) {
  var cs2 = getComputedStyle(dimLayout);
  results.dimensionLayout = {
    bg: cs2.backgroundColor,
    border: cs2.border,
    borderRadius: cs2.borderRadius,
    backdropFilter: cs2.backdropFilter,
    padding: cs2.padding,
    boxShadow: cs2.boxShadow,
  };
}

// Placeholder color - create temp style check
var textarea = document.querySelector(".prompt-textarea-mYAOkL");
if (textarea) {
  results.textareaPlaceholder = {
    note: "Cannot read ::placeholder via JS, but visually it is teal/cyan color"
  };
}

// Select arrow/suffix area
var selectArrow = document.querySelector(".lv-select-arrow-icon");
if (selectArrow) {
  var cs3 = getComputedStyle(selectArrow);
  results.selectArrow = {
    color: cs3.color,
    fontSize: cs3.fontSize,
    width: cs3.width,
    height: cs3.height,
  };
}

// Select icon in value
var selectIcon = document.querySelector(".select-option-icon-kOLUc7");
if (selectIcon) {
  var cs4 = getComputedStyle(selectIcon);
  results.selectOptionIcon = {
    color: cs4.color,
    fontSize: cs4.fontSize,
    width: cs4.width,
    height: cs4.height,
  };
}

// Type select (first select - AI type)
var typeSelect = document.querySelector(".type-select-DM4EzS");
if (typeSelect) {
  var view = typeSelect.querySelector(".lv-select-view");
  if (view) {
    var cs5 = getComputedStyle(view);
    results.typeSelectView = {
      padding: cs5.padding,
      gap: cs5.gap,
      height: cs5.height,
      display: cs5.display,
      alignItems: cs5.alignItems,
    };
  }
}

// Button text inside toolbar button
var btnText = document.querySelector(".button-text-LP2pYx");
if (btnText) {
  var cs6 = getComputedStyle(btnText);
  results.toolbarBtnText = {
    fontSize: cs6.fontSize,
    color: cs6.color,
    gap: cs6.gap,
    display: cs6.display,
  };
}

// Divider inside ratio button
var divider = document.querySelector(".divider-tMZ_VJ");
if (divider) {
  var cs7 = getComputedStyle(divider);
  results.divider = {
    width: cs7.width,
    height: cs7.height,
    bg: cs7.backgroundColor,
    margin: cs7.margin,
  };
}

// Plus icon in upload
var plusIcon = document.querySelector(".icon-QD5Y5E");
if (plusIcon) {
  var cs8 = getComputedStyle(plusIcon);
  results.uploadPlusIcon = {
    color: cs8.color,
    width: cs8.width,
    height: cs8.height,
    fontSize: cs8.fontSize,
  };
}

// toolbar-settings content (left side of toolbar)
var toolbarContent = document.querySelector(".toolbar-settings-content-AvgURE");
if (toolbarContent) {
  var cs9 = getComputedStyle(toolbarContent);
  results.toolbarSettingsContent = {
    display: cs9.display,
    gap: cs9.gap,
    alignItems: cs9.alignItems,
  };
}

// toolbar actions (right side)
var toolbarActions = document.querySelector(".toolbar-actions-lxWY6i");
if (toolbarActions) {
  var cs10 = getComputedStyle(toolbarActions);
  results.toolbarActions = {
    display: cs10.display,
    gap: cs10.gap,
    alignItems: cs10.alignItems,
  };
}

JSON.stringify(results, null, 2);
