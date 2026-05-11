(function () {
  var brandCopy = {
    title: "Mass Data",
    subtitle: "Identity Command",
    body: "A private access layer for Mass Data platforms, governed sessions, and intelligent digital services.",
    eyebrow: "Mass Data SSO",
    chips: ["Zero-trust ready", "OIDC secured", "UAE hosted"],
    footer: "Protected by Mass Data SSO"
  };

  function setTheme() {
    try {
      localStorage.setItem("theme", "light-theme");
      localStorage.setItem("cp-theme", "light");
      document.documentElement.classList.remove("dark", "dark-theme");
      document.documentElement.classList.add("light-theme", "mass-login-enhanced");
      document.body && document.body.classList.add("mass-login-reference-layout");
      document.documentElement.style.colorScheme = "light";
    } catch (_) {
      document.documentElement.classList.add("mass-login-enhanced");
      document.body && document.body.classList.add("mass-login-reference-layout");
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
      '<div class="mass-login-visual" aria-hidden="true">',
      '  <svg class="mass-login-mesh" viewBox="0 0 620 360" role="img">',
      "    <defs>",
      '      <linearGradient id="massMeshLine" x1="0" x2="1" y1="0" y2="1">',
      '        <stop stop-color="#ef232a" offset="0"/>',
      '        <stop stop-color="#92722a" offset="1"/>',
      "      </linearGradient>",
      '      <filter id="massGlow" x="-40%" y="-40%" width="180%" height="180%">',
      '        <feGaussianBlur stdDeviation="5" result="blur"/>',
      '        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>',
      "      </filter>",
      "    </defs>",
      '    <path d="M56 284 C160 214 180 88 304 148 C422 205 454 55 566 86" />',
      '    <path d="M86 104 C178 166 224 245 336 208 C438 174 478 226 548 292" />',
      '    <path d="M110 246 L214 104 L340 206 L454 108 L548 174" />',
      '    <g filter="url(#massGlow)">',
      '      <circle cx="56" cy="284" r="8" />',
      '      <circle cx="214" cy="104" r="9" />',
      '      <circle cx="340" cy="206" r="8" />',
      '      <circle cx="454" cy="108" r="9" />',
      '      <circle cx="566" cy="86" r="8" />',
      '      <circle cx="548" cy="292" r="7" />',
      "    </g>",
      "  </svg>",
      '  <div class="mass-login-node-layer">',
      '    <span class="mass-login-node mass-login-node-key"><svg viewBox="0 0 24 24"><path d="M14 7.5a4.5 4.5 0 1 0 1.2 4.2L22 5v4h-3v3h-3v3h-3.5"/></svg></span>',
      '    <span class="mass-login-node mass-login-node-shield"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.3-2.8 8-7 10-4.2-2-7-5.7-7-10V6l7-3z"/><path d="M9 12l2 2 4-5"/></svg></span>',
      '    <span class="mass-login-node mass-login-node-scan"><svg viewBox="0 0 24 24"><path d="M8 4H5a1 1 0 0 0-1 1v3M16 4h3a1 1 0 0 1 1 1v3M8 20H5a1 1 0 0 1-1-1v-3M16 20h3a1 1 0 0 0 1-1v-3"/><path d="M8 12h8M12 8v8"/></svg></span>',
      '    <span class="mass-login-node mass-login-node-fingerprint"><svg viewBox="0 0 24 24"><path d="M7.7 16.8c.4-2.4.1-4.8 1.7-6.3 1.5-1.5 4.1-1.5 5.3.1 1.3 1.7.8 4 .4 6.2"/><path d="M5 13.4c0-4 2.7-7.2 6.7-7.2 4.6 0 7.3 3.2 7.3 7.3"/><path d="M10.4 18.8c.7-1.7.8-3.7.8-5.7 0-.8.7-1.5 1.5-1.5s1.4.7 1.4 1.5c0 2.5-.1 4.6-1.1 6.8"/></svg></span>',
      '    <span class="mass-login-node mass-login-node-lock"><svg viewBox="0 0 24 24"><path d="M7 11V8a5 5 0 0 1 10 0v3"/><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M12 15v2"/></svg></span>',
      '    <span class="mass-login-node mass-login-node-route"><svg viewBox="0 0 24 24"><path d="M5 7a3 3 0 1 0 0 .1M19 17a3 3 0 1 0 0 .1M8 7h4a4 4 0 0 1 0 8h-1a4 4 0 0 0-4 4"/></svg></span>',
      '  </div>',
      '  <div class="mass-login-orbit-card mass-login-orbit-card-a"><strong>SSO</strong><span>Live policy</span></div>',
      '  <div class="mass-login-orbit-card mass-login-orbit-card-b"><strong>OIDC</strong><span>Verified route</span></div>',
      '  <div class="mass-login-orbit-card mass-login-orbit-card-c"><strong>Risk</strong><span>Adaptive ready</span></div>',
      "</div>",
      '<div class="mass-login-brand-copy">',
      '  <h1>' + brandCopy.subtitle + "</h1>",
      "  <p>" + brandCopy.body + "</p>",
      "</div>",
      '<div class="mass-login-metrics">',
      '  <div><strong>99.9%</strong><span>Access uptime target</span><i aria-hidden="true">UP</i></div>',
      '  <div><strong>443</strong><span>TLS public edge</span><i aria-hidden="true">TLS</i></div>',
      '  <div><strong>0</strong><span>Risk-based events</span><i aria-hidden="true">R0</i></div>',
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
    var form = document.querySelector("form");
    if (form) {
      form.classList.add("mass-login-form");
      var parent = form.parentElement;
      if (parent) parent.classList.add("mass-login-form-host");
      var shell = form.closest('[class*="bg-background-light"]') || (parent && parent.parentElement && parent.parentElement.parentElement);
      if (shell) shell.classList.add("mass-login-card-shell");
    }

    var inputs = Array.from(document.querySelectorAll("input"));
    inputs.forEach(function (input) {
      input.setAttribute("autocomplete", input.type === "password" ? "current-password" : "username");
      if (input.type !== "password") {
        input.setAttribute("placeholder", "Username / Email");
      }
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
        if (/^back$/i.test(label)) {
          button.textContent = "Go Back";
        }
      }
    });

    if (!document.querySelector(".mass-login-trust-row")) {
      var trust = document.createElement("div");
      trust.className = "mass-login-trust-row";
      trust.innerHTML = '<span></span><strong>' + brandCopy.footer + "</strong><span></span>";
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
