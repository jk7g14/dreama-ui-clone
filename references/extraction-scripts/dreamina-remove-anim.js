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
    overflow: cs.overflow,
  };
});

// Look for animation keyframes related to removal/exit
var animRules = [];
try {
  for (var s = 0; s < document.styleSheets.length; s++) {
    try {
      var sheet = document.styleSheets[s];
      var rules = sheet.cssRules || sheet.rules;
      for (var r = 0; r < rules.length; r++) {
        var rule = rules[r];
        // Keyframes
        if (rule.type === CSSRule.KEYFRAMES_RULE) {
          var name = rule.name;
          if (name.includes("remove") || name.includes("exit") || name.includes("leave") || name.includes("fade") || name.includes("slide") || name.includes("shrink") || name.includes("collapse") || name.includes("delete")) {
            animRules.push({ name: name, css: rule.cssText.substring(0, 500) });
          }
        }
        // Regular rules with reference-related selectors and transitions/animations
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

// Check for React/framework event handlers on reference items
var firstRef = document.querySelector("[class*='reference-item']");
if (firstRef) {
  var reactKey = Object.keys(firstRef).find(function(k) { return k.startsWith("__reactFiber") || k.startsWith("__reactInternalInstance") || k.startsWith("__reactProps"); });
  if (reactKey) {
    var props = firstRef[reactKey];
    results.reactProps = JSON.stringify(props, function(key, val) {
      if (typeof val === "function") return "[Function:" + (val.name || "anonymous") + "]";
      if (key.startsWith("__")) return undefined;
      return val;
    }, 2).substring(0, 1500);
  }
}

// Check for TransitionGroup or CSSTransition class patterns
var transitionEls = document.querySelectorAll("[class*='enter'], [class*='exit'], [class*='appear']");
results.transitionClassCount = transitionEls.length;
if (transitionEls.length > 0) {
  results.transitionClasses = [];
  transitionEls.forEach(function(el, i) {
    if (i < 5) results.transitionClasses.push(el.className.substring(0, 200));
  });
}

JSON.stringify(results, null, 2);
