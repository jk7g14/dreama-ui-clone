var results = {};

// 1. Main card container
var layout = document.querySelector(".layout-q8z7dj");
if (layout) {
  var cs = getComputedStyle(layout);
  results.layout = {
    bg: cs.backgroundColor,
    border: cs.border,
    borderRadius: cs.borderRadius,
    backdropFilter: cs.backdropFilter,
    padding: cs.padding,
    boxShadow: cs.boxShadow,
    width: cs.width,
    height: cs.height,
  };
}

// 2. Upload button
var uploadBtn = document.querySelector(".reference-upload-_BLH8k");
if (uploadBtn) {
  var cs2 = getComputedStyle(uploadBtn);
  results.uploadBtn = {
    bg: cs2.backgroundColor,
    border: cs2.border,
    borderRadius: cs2.borderRadius,
    width: cs2.width,
    height: cs2.height,
    cursor: cs2.cursor,
    transform: cs2.transform,
  };
}

var uploadItem = document.querySelector(".reference-item-IcXfhS");
if (uploadItem) {
  var cs3 = getComputedStyle(uploadItem);
  results.uploadItem = {
    width: cs3.width,
    height: cs3.height,
    transform: cs3.transform,
    borderRadius: cs3.borderRadius,
    overflow: cs3.overflow,
  };
}

// 3. Textarea
var textarea = document.querySelector(".prompt-textarea-mYAOkL");
if (textarea) {
  var cs4 = getComputedStyle(textarea);
  results.textarea = {
    fontSize: cs4.fontSize,
    color: cs4.color,
    lineHeight: cs4.lineHeight,
    bg: cs4.backgroundColor,
    border: cs4.border,
    padding: cs4.padding,
    height: cs4.height,
    minHeight: cs4.minHeight,
    fontFamily: cs4.fontFamily.substring(0, 100),
  };
}

// 4. Toolbar selects
var selects = document.querySelectorAll(".toolbar-select-OTtrfP");
selects.forEach(function(sel, i) {
  var cs5 = getComputedStyle(sel);
  results["select_" + i] = {
    bg: cs5.backgroundColor,
    border: cs5.border,
    borderRadius: cs5.borderRadius,
    height: cs5.height,
    fontSize: cs5.fontSize,
    padding: cs5.padding,
    color: cs5.color,
    gap: cs5.gap,
    cursor: cs5.cursor,
  };
});

// 5. Toolbar buttons (ratio, font)
var toolbarBtns = document.querySelectorAll(".toolbar-button-scI9YR");
toolbarBtns.forEach(function(btn, i) {
  var cs6 = getComputedStyle(btn);
  results["toolbarBtn_" + i] = {
    bg: cs6.backgroundColor,
    border: cs6.border,
    borderRadius: cs6.borderRadius,
    height: cs6.height,
    width: cs6.width,
    fontSize: cs6.fontSize,
    padding: cs6.padding,
    color: cs6.color,
    gap: cs6.gap,
  };
});

// 6. Submit button
var submitBtn = document.querySelector(".submit-button-WMGapN");
if (submitBtn) {
  var cs7 = getComputedStyle(submitBtn);
  results.submitBtn = {
    bg: cs7.backgroundColor,
    border: cs7.border,
    borderRadius: cs7.borderRadius,
    width: cs7.width,
    height: cs7.height,
    color: cs7.color,
    opacity: cs7.opacity,
    cursor: cs7.cursor,
  };
}

// 7. Counter / commercial content
var counter = document.querySelector(".commercial-button-content-PYgKl0");
if (counter) {
  var cs8 = getComputedStyle(counter);
  results.counter = {
    fontSize: cs8.fontSize,
    color: cs8.color,
    gap: cs8.gap,
    display: cs8.display,
  };
}

// 8. Toolbar container
var toolbar = document.querySelector(".toolbar-f_4lTy");
if (toolbar) {
  var cs9 = getComputedStyle(toolbar);
  results.toolbar = {
    height: cs9.height,
    padding: cs9.padding,
    gap: cs9.gap,
    bg: cs9.backgroundColor,
    display: cs9.display,
    alignItems: cs9.alignItems,
  };
}

// 9. Content area (card inner)
var content = document.querySelector(".content-Nt6Sal");
if (content) {
  var cs10 = getComputedStyle(content);
  results.contentArea = {
    bg: cs10.backgroundColor,
    padding: cs10.padding,
    gap: cs10.gap,
    display: cs10.display,
    flexDirection: cs10.flexDirection,
  };
}

// 10. Select view value text
var selVal = document.querySelector(".lv-select-view-value");
if (selVal) {
  var cs11 = getComputedStyle(selVal);
  results.selectValueText = {
    fontSize: cs11.fontSize,
    color: cs11.color,
    fontWeight: cs11.fontWeight,
    lineHeight: cs11.lineHeight,
  };
}

// 11. Reference group (upload container)
var refGroup = document.querySelector(".reference-group-vxHhes");
if (refGroup) {
  var cs12 = getComputedStyle(refGroup);
  results.refGroup = {
    width: cs12.width,
    height: cs12.height,
    padding: cs12.padding,
    gap: cs12.gap,
  };
}

var refBg = document.querySelector(".reference-group-background-HfedGf");
if (refBg) {
  var cs13 = getComputedStyle(refBg);
  results.refGroupBg = {
    bg: cs13.backgroundColor,
    border: cs13.border,
    borderRadius: cs13.borderRadius,
    width: cs13.width,
    height: cs13.height,
  };
}

JSON.stringify(results, null, 2);
