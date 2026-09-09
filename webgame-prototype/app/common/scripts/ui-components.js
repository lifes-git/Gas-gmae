(function () {
  "use strict";

  var variants = ["primary", "info", "success", "danger", "neutral"];

  function applyVariant(node, variant) {
    variants.forEach(function (name) { node.classList.remove("ui-button--" + name); });
    node.classList.add("ui-button--" + (variants.includes(variant) ? variant : "neutral"));
    node.dataset.uiVariant = variants.includes(variant) ? variant : "neutral";
    return node;
  }

  function enhanceButton(node, options) {
    options = options || {};
    node.classList.add(options.iconOnly ? "ui-icon-button" : "ui-button");
    applyVariant(node, options.variant || "neutral");
    if (options.iconOnly) node.dataset.uiIcon = "true";
    if (options.ariaLabel) node.setAttribute("aria-label", options.ariaLabel);
    return node;
  }

  function createButton(options) {
    var node = document.createElement("button");
    node.type = options.type || "button";
    node.className = options.className || "";
    if (options.html !== undefined) node.innerHTML = options.html;
    else node.textContent = options.label || "";
    enhanceButton(node, options);
    if (options.onClick) node.addEventListener("click", options.onClick);
    return node;
  }

  function enhance(root) {
    root.querySelectorAll("[data-ui-component='button']").forEach(function (node) {
      enhanceButton(node, {
        variant: node.dataset.uiVariant,
        iconOnly: node.dataset.uiIcon === "true",
        ariaLabel: node.getAttribute("aria-label")
      });
    });
  }

  window.GameUI = Object.freeze({
    applyVariant: applyVariant,
    enhanceButton: enhanceButton,
    createButton: createButton,
    enhance: enhance
  });

  enhance(document);
})();
