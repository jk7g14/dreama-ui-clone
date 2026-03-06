// Find the main prompt input area
const textarea = document.querySelector("textarea");
const editable = document.querySelector("[contenteditable]");
const input = textarea || editable;
if (!input) return "NO INPUT FOUND - elements: " + document.querySelectorAll("input, textarea, [contenteditable]").length;

// Walk up to find the main card container
let card = input;
for (let i = 0; i < 15; i++) {
  if (!card.parentElement) break;
  card = card.parentElement;
  const cs = getComputedStyle(card);
  if (cs.borderRadius && parseInt(cs.borderRadius) > 10) break;
}

const cs = getComputedStyle(card);
const inputCs = getComputedStyle(input);

// Find upload button area
const allButtons = Array.from(document.querySelectorAll("button"));
const uploadBtn = allButtons.find(b => {
  const rect = b.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  return rect.top >= cardRect.top && rect.bottom <= cardRect.bottom && rect.width < 80 && rect.height > 50;
});
const uploadCs = uploadBtn ? getComputedStyle(uploadBtn) : null;

// Find submit button (usually last button in card area or has arrow icon)
const cardRect = card.getBoundingClientRect();
const cardButtons = allButtons.filter(b => {
  const r = b.getBoundingClientRect();
  return r.top >= cardRect.top && r.bottom <= cardRect.bottom;
});
const submitBtn = cardButtons[cardButtons.length - 1];
const submitCs = submitBtn ? getComputedStyle(submitBtn) : null;

// Find toolbar/footer area buttons (selects, dropdowns)
const selects = Array.from(card.querySelectorAll("button[class], [role=combobox], [class*=select], [class*=dropdown]"));
const toolbarButtons = selects.slice(0, 5).map(el => {
  const elCs = getComputedStyle(el);
  return {
    text: el.textContent.substring(0, 50).trim(),
    tag: el.tagName,
    border: elCs.border,
    borderRadius: elCs.borderRadius,
    bg: elCs.backgroundColor,
    height: elCs.height,
    fontSize: elCs.fontSize,
    padding: elCs.padding,
    color: elCs.color,
    gap: elCs.gap,
  };
});

return JSON.stringify({
  card: {
    tag: card.tagName,
    className: card.className.substring(0, 200),
    bg: cs.backgroundColor,
    border: cs.border,
    borderRadius: cs.borderRadius,
    backdropFilter: cs.backdropFilter,
    webkitBackdropFilter: cs.webkitBackdropFilter,
    padding: cs.padding,
    boxShadow: cs.boxShadow,
    width: cs.width,
  },
  input: {
    tag: input.tagName,
    placeholder: input.placeholder || input.dataset.placeholder,
    fontSize: inputCs.fontSize,
    color: inputCs.color,
    lineHeight: inputCs.lineHeight,
    bg: inputCs.backgroundColor,
    border: inputCs.border,
    padding: inputCs.padding,
    height: inputCs.height,
    minHeight: inputCs.minHeight,
  },
  uploadBtn: uploadBtn ? {
    width: uploadCs.width,
    height: uploadCs.height,
    bg: uploadCs.backgroundColor,
    border: uploadCs.border,
    borderRadius: uploadCs.borderRadius,
    transform: uploadCs.transform,
    cursor: uploadCs.cursor,
  } : "NOT FOUND",
  submitBtn: submitBtn ? {
    text: submitBtn.textContent.substring(0, 30),
    width: submitCs.width,
    height: submitCs.height,
    bg: submitCs.backgroundColor,
    border: submitCs.border,
    borderRadius: submitCs.borderRadius,
    color: submitCs.color,
    disabled: submitBtn.disabled,
  } : "NOT FOUND",
  toolbarButtons: toolbarButtons,
}, null, 2);
