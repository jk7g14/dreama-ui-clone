var root = getComputedStyle(document.documentElement);
var vars = [
  "--bg-block-primary-hover",
  "--bg-block-primary-default",
  "--bg-block-secondary-hover",
  "--bg-block-secondary-default",
  "--component-upload-button-hover",
  "--component-upload-button-default",
  "--lvv-color-main-hover",
  "--lvv-color-fill-transparency-hover",
  "--lvv-color-text-primary",
  "--lvv-color-text-secondary",
  "--lvv-color-text-content-primary",
];

var results = {};
vars.forEach(function(v) {
  results[v] = root.getPropertyValue(v).trim();
});

// Also check on the card element itself
var card = document.querySelector("[class*='content-generator']");
if (card) {
  var cardCs = getComputedStyle(card);
  var cardVars = {};
  vars.forEach(function(v) {
    cardVars[v] = cardCs.getPropertyValue(v).trim();
  });
  results.cardScope = cardVars;
}

JSON.stringify(results, null, 2);
