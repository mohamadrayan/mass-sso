(function () {
  var brandCopy = {
    title: "Mass Data",
    subtitle: "Secure Intelligence Access",
    body: "One trusted gateway for Mass Data platforms, analytics, and protected digital services.",
    eyebrow: "Enterprise SSO",
    chips: ["Encrypted session", "MFA ready", "UAE hosted"],
    footer: "Protected by Mass Data SSO"
  };

  function setTheme() {
    try {
      localStorage.setItem("theme", "light-theme");
      localStorage.setItem("cp-theme", "light");
      document.documentElement.classList.remove("dark", "dark-theme");
      document.documentElement.classList.add("light-theme", "mass-login-enhanced");
      document.documentElement.style.colorScheme = "light";
    } catch (_) {
      document.documentElement.classList.add("mass-login-enhanced");
    }
  }

  function createPanel() {
    if (document.querySelector(".mass-login-brand-panel")) return;
    if (!document.body) return;

    var panel = document.createElement("aside");
    panel.className = "mass-login-brand-panel";
    panel.setAttribute("aria-label", "Mass Data secure access");
    panel.innerHTML = [
      '<div class="mass-login-brand-lockup">',
      '  <img src="/ui/login-theme/massdata-logo.png" alt="Mass Data" class="mass-login-logo">',
      '  <span class="mass-login-eyebrow">' + brandCopy.eyebrow + "</span>",
      "</div>",
      '<div class="mass-login-brand-copy">',
      '  <h1>' + brandCopy.subtitle + "</h1>",
      "  <p>" + brandCopy.body + "</p>",
      "</div>",
      '<div class="mass-login-chips">',
      brandCopy.chips.map(function (chip) {
        return '<span>' + chip + "</span>";
      }).join(""),
      "</div>",
      '<div class="mass-login-signal" aria-hidden="true">',
      '  <span class="mass-login-signal-dot"></span>',
      "  <span>Identity fabric online</span>",
      "</div>"
    ].join("");

    document.body.prepend(panel);
  }

  function enhanceCopy() {
    var headings = Array.from(document.querySelectorAll("h1, h2"));
    var welcome = headings.find(function (node) {
      return /welcome|login|sign/i.test(node.textContent || "");
    });
    if (welcome && !welcome.dataset.massLoginDone) {
      welcome.textContent = "Welcome to Mass Data";
      welcome.dataset.massLoginDone = "true";
    }

    var paragraphs = Array.from(document.querySelectorAll("p"));
    var intro = paragraphs.find(function (node) {
      return /login|details|enter/i.test(node.textContent || "");
    });
    if (intro && !intro.dataset.massLoginDone) {
      intro.textContent = "Sign in securely to continue to your workspace.";
      intro.dataset.massLoginDone = "true";
    }
  }

  function enhanceForm() {
    var inputs = Array.from(document.querySelectorAll("input"));
    inputs.forEach(function (input) {
      input.setAttribute("autocomplete", input.type === "password" ? "current-password" : "username");
    });

    Array.from(document.querySelectorAll("button")).forEach(function (button) {
      var label = (button.textContent || "").trim();
      if (/continue|next/i.test(label)) {
        button.classList.add("mass-login-submit");
        button.setAttribute("aria-label", "Continue securely");
      } else if (/register/i.test(label)) {
        button.classList.add("mass-login-register");
      } else if (/back/i.test(label)) {
        button.classList.add("mass-login-back");
      }
    });

    if (!document.querySelector(".mass-login-trust-row")) {
      var trust = document.createElement("div");
      trust.className = "mass-login-trust-row";
      trust.innerHTML = '<span></span><strong>' + brandCopy.footer + "</strong><span></span>";
      var form = document.querySelector("form");
      if (form) form.appendChild(trust);
    }
  }

  function enhance() {
    setTheme();
    createPanel();
    enhanceCopy();
    enhanceForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhance);
  } else {
    enhance();
  }
  window.addEventListener("load", enhance);
  setTimeout(enhance, 500);
  setTimeout(enhance, 1500);
  setTimeout(enhance, 3000);
})();
