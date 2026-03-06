var results = {};

// Find reference items and their animation/transition CSS
var refItems = document.querySelectorAll("[class*='reference-item'], [class*='reference-group'], [class*='reference-upload']");
refItems.forEach(function(el, i) {
  var cs = getComputedStyle(el);
  results["refEl_" + i] = {
    className: el.className.substring(0, 120),
    transition: cs.transition,
    animation: cs.animation,
    transform: cs.transform,
    position: cs.position,
    display: cs.display,
    width: cs.width,
    height: cs.height,
  };
});

// Look for animation keyframes and transition rules
var animRules = [];
try {
  for (var s = 0; s < document.styleSheets.length; s++) {
    try {
      var sheet = document.styleSheets[s];
      var rules = sheet.cssRules || sheet.rules;
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        if (rule.type === CSSRule.KEYFRAMES_RULE) {
          var name = rule.name;
          if (name.includes("remove") || name.includes("exit") || name.includes("leave") || name.includes("fade") || name.includes("slide") || name.includes("shrink") || name.includes("collapse") || name.includes("delete") || name.includes("stack") || name.includes("card")) {
            animRules.push({ name: name, css: rule.cssText.substring(0, 500) });
          }
        }
        if (rule.selectorText && (rule.selectorText.includes("reference") || rule.selectorText.includes("stack") || rule.selectorText.includes("upload-item"))) {
          if (rule.cssText.includes("transition") || rule.cssText.includes("animation") || rule.cssText.includes("transform")) {
            animRules.push({ selector: rule.selectorText.substring(0, 150), css: rule.cssText.substring(0, 500) });
          }
        }
      }
    } catch(e) {}
  }
} catch(e) {}
results.animRules = animRules.slice(0, 30);

// Check for TransitionGroup or CSSTransition class patterns
var transitionEls = document.querySelectorAll("[class*='enter'], [class*='exit'], [class*='appear']");
results.transitionClassCount = transitionEls.length;

// Check references container for framer-motion or react-transition-group
var refsContainer = document.querySelector("[class*='references']");
if (refsContainer) {
  results.refsContainerHTML = refsContainer.outerHTML.substring(0, 2000);
}

JSON.stringify(results, null, 2);
