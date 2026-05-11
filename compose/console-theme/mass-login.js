(function () {
  var copy = {
    en: {
      heroTitle: "Identity Command",
      heroSubtitle: "Secure access for trusted digital services.",
      stats: [
        ["99.9%", "Access uptime"],
        ["443", "TLS public edge"],
        ["0", "Blue vendor surface"]
      ],
      pills: ["Zero-trust ready", "OIDC secured", "UAE hosted"],
      statusStrong: "Identity fabric online",
      statusText: "All systems operational",
      welcome: "Welcome to Mass Data",
      intro: "Sign in securely to continue to your workspace.",
      registerTitle: "Register",
      registerIntro: "Create your Mass Data SSO account.",
      username: "Username",
      usernamePlaceholder: "Enter your username",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      firstName: "First name",
      lastName: "Last name",
      email: "E-mail",
      verificationCode: "Verification code",
      back: "Back",
      register: "Register new user",
      continueButton: "Continue",
      continueLabel: "Continue securely",
      footer: "Protected by Mass Data SSO",
      legal: ["Security", "Privacy", "Terms of Use"]
    },
    ar: {
      heroTitle: "\u0645\u0631\u0643\u0632 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0647\u0648\u064a\u0629",
      heroSubtitle: "\u0648\u0635\u0648\u0644 \u0622\u0645\u0646 \u0644\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u0627\u0644\u0645\u0648\u062b\u0648\u0642\u0629.",
      stats: [
        ["99.9%", "\u062c\u0627\u0647\u0632\u064a\u0629 \u0627\u0644\u062e\u062f\u0645\u0629"],
        ["443", "\u0648\u0627\u062c\u0647\u0629 TLS \u0627\u0644\u0639\u0627\u0645\u0629"],
        ["0", "\u0646\u0642\u0627\u0637 \u062a\u0639\u0631\u0636 \u062e\u0627\u0631\u062c\u064a\u0629"]
      ],
      pills: ["\u062c\u0627\u0647\u0632 \u0644\u0640 Zero-Trust", "\u0645\u0624\u0645\u0646 \u0639\u0628\u0631 OIDC", "\u0645\u0633\u062a\u0636\u0627\u0641 \u062f\u0627\u062e\u0644 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a"],
      statusStrong: "\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0647\u0648\u064a\u0629 \u062a\u0639\u0645\u0644",
      statusText: "\u062c\u0645\u064a\u0639 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0628\u062d\u0627\u0644\u0629 \u062a\u0634\u063a\u064a\u0644",
      welcome: "\u0645\u0631\u062d\u0628\u0627 \u0628\u0643 \u0641\u064a Mass Data",
      intro: "\u0633\u062c\u0644 \u0627\u0644\u062f\u062e\u0648\u0644 \u0628\u0623\u0645\u0627\u0646 \u0644\u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0625\u0644\u0649 \u0645\u0633\u0627\u062d\u0629 \u0639\u0645\u0644\u0643.",
      registerTitle: "\u062a\u0633\u062c\u064a\u0644",
      registerIntro: "\u0623\u0646\u0634\u0626 \u062d\u0633\u0627\u0628 Mass Data SSO \u0627\u0644\u062e\u0627\u0635 \u0628\u0643.",
      username: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",
      usernamePlaceholder: "\u0623\u062f\u062e\u0644 \u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645",
      password: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
      passwordPlaceholder: "\u0623\u062f\u062e\u0644 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
      firstName: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644",
      lastName: "\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629",
      email: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
      verificationCode: "\u0631\u0645\u0632 \u0627\u0644\u062a\u062d\u0642\u0642",
      back: "\u0631\u062c\u0648\u0639",
      register: "\u062a\u0633\u062c\u064a\u0644 \u0645\u0633\u062a\u062e\u062f\u0645 \u062c\u062f\u064a\u062f",
      continueButton: "\u0645\u062a\u0627\u0628\u0639\u0629",
      continueLabel: "\u0645\u062a\u0627\u0628\u0639\u0629 \u0622\u0645\u0646\u0629",
      footer: "\u0645\u062d\u0645\u064a \u0628\u0648\u0627\u0633\u0637\u0629 Mass Data SSO",
      legal: ["\u0627\u0644\u0623\u0645\u0627\u0646", "\u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629", "\u0634\u0631\u0648\u0637 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645"]
    }
  };

  function isRtl() {
    var lang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    var dir = (document.documentElement.getAttribute("dir") || document.dir || "").toLowerCase();
    if (dir === "rtl" || lang.indexOf("ar") === 0) return true;

    var languageButtons = Array.from(document.querySelectorAll("button[aria-expanded]"));
    return languageButtons.some(function (button) {
      return /[\u0600-\u06FF]/.test(button.textContent || "");
    });
  }

  function getCopy() {
    return isRtl() ? copy.ar : copy.en;
  }

  function setTheme() {
    try {
      localStorage.setItem("theme", "light-theme");
      localStorage.setItem("cp-theme", "light");
    } catch (_) {}

    document.documentElement.classList.remove("dark", "dark-theme");
    document.documentElement.classList.add("light-theme", "mass-login-enhanced");
    document.documentElement.style.colorScheme = "light";

    if (document.body) {
      document.body.classList.add("mass-login-reference-layout");
      document.body.classList.toggle("mass-login-rtl", isRtl());
    }
  }

  function createPanel() {
    if (!document.body) return;
    var t = getCopy();

    var panel = document.querySelector(".mass-login-brand-panel");
    if (!panel) {
      panel = document.createElement("aside");
      document.body.prepend(panel);
    }

    var locale = isRtl() ? "ar" : "en";
    panel.className = "mass-login-brand-panel mass-login-programmed-hero-panel";
    panel.setAttribute("aria-label", "Mass Data secure identity panel");
    if (panel.dataset.massLocale === locale && panel.querySelector(".mass-hero-title")) {
      return;
    }
    panel.dataset.massLocale = locale;
    panel.innerHTML = [
      '<img class="mass-hero-layer mass-hero-layer-base" src="/ui/login-theme/assets/svg/layers/dark-desktop/00-base-emerald-gradient-opaque.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-layer-pattern" src="/ui/login-theme/assets/svg/layers/dark-desktop/01-geometric-gold-pattern-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-layer-map" src="/ui/login-theme/assets/svg/layers/dark-desktop/02-world-map-dots-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-layer-arcs" src="/ui/login-theme/assets/svg/layers/dark-desktop/03-connection-arcs-and-nodes-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-layer-radar" src="/ui/login-theme/assets/svg/layers/dark-desktop/04-radar-rings-and-glow-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-layer-shield" src="/ui/login-theme/assets/svg/layers/dark-desktop/05-hologram-shield-user-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-layer-skyline" src="/ui/login-theme/assets/svg/layers/dark-desktop/06-dubai-skyline-and-reflection-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-layer-particles" src="/ui/login-theme/assets/svg/layers/dark-desktop/07-gold-particles-and-soft-glints-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-mobile-layer mass-hero-mobile-base" src="/ui/login-theme/assets/svg/layers/mobile-dark-hero/00-mobile-base-emerald-gradient-opaque.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-mobile-layer mass-hero-mobile-pattern" src="/ui/login-theme/assets/svg/layers/mobile-dark-hero/05-mobile-side-geometric-pattern-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-mobile-layer mass-hero-mobile-map" src="/ui/login-theme/assets/svg/layers/mobile-dark-hero/01-mobile-world-map-dots-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-mobile-layer mass-hero-mobile-arcs" src="/ui/login-theme/assets/svg/layers/mobile-dark-hero/02-mobile-connection-arcs-nodes-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-mobile-layer mass-hero-mobile-shield" src="/ui/login-theme/assets/svg/layers/mobile-dark-hero/03-mobile-hologram-shield-transparent.svg" alt="">',
      '<img class="mass-hero-layer mass-hero-mobile-layer mass-hero-mobile-skyline" src="/ui/login-theme/assets/svg/layers/mobile-dark-hero/04-mobile-dubai-skyline-transparent.svg" alt="">',
      '<div class="mass-hero-content">',
      '  <img class="mass-hero-logo" src="/ui/login-theme/assets/logo/png/lockup/massdata-lockup-horizontal-gold.png" alt="Mass Data">',
      '  <div class="mass-hero-copy">',
      '    <h1 class="mass-hero-title">' + t.heroTitle + "</h1>",
      '    <p class="mass-hero-subtitle">' + t.heroSubtitle + "</p>",
      '    <div class="mass-hero-stats">',
      t.stats.map(function (item) {
        return '<div class="mass-hero-stat"><strong>' + item[0] + "</strong><span>" + item[1] + "</span></div>";
      }).join(""),
      "    </div>",
      '    <div class="mass-hero-pills">',
      t.pills.map(function (item) {
        return '<span class="mass-hero-pill">' + item + "</span>";
      }).join(""),
      "    </div>",
      '    <div class="mass-hero-status"><i></i><div><strong>' + t.statusStrong + "</strong><span>" + t.statusText + "</span></div></div>",
      "  </div>",
      "</div>"
    ].join("");
  }

  function pageKind() {
    var url = window.location.pathname.toLowerCase();
    var headingText = Array.from(document.querySelectorAll("h1, h2"))
      .map(function (node) { return (node.textContent || "").trim().toLowerCase(); })
      .join(" ");
    if (/register/.test(url) || /\bregister\b/.test(headingText)) return "register";
    if (/password/.test(url) || document.querySelector('input[type="password"]')) return "password";
    return "login";
  }

  function setTextIfLeaf(node, value) {
    if (!node || node.children.length) return;
    node.textContent = value;
  }

  function enhanceCopy() {
    var t = getCopy();
    var kind = pageKind();

    Array.from(document.querySelectorAll("h1, h2")).forEach(function (heading) {
      var text = (heading.textContent || "").trim();
      if (heading.closest(".mass-login-brand-panel")) return;
      if (!text) return;
      if (/register/i.test(text) || (isRtl() && kind === "register")) {
        heading.textContent = kind === "register" ? t.registerTitle : heading.textContent;
      } else if (/welcome|login|sign|password|details/i.test(text)) {
        heading.textContent = t.welcome;
      }
    });

    Array.from(document.querySelectorAll("p")).forEach(function (paragraph) {
      var text = (paragraph.textContent || "").trim();
      if (paragraph.closest(".mass-login-brand-panel")) return;
      if (!text) return;
      if (/create your zitadel account|create your .* account|register/i.test(text) || kind === "register") {
        setTextIfLeaf(paragraph, t.registerIntro);
      } else if (/sign in|login|details|workspace|enter/i.test(text)) {
        setTextIfLeaf(paragraph, t.intro);
      }
    });
  }

  function replaceTextNodes(root) {
    var t = getCopy();
    if (!root) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      var value = node.nodeValue || "";
      var trimmed = value.trim();
      if (!trimmed) return;

      var usernamePattern = new RegExp("log" + "in\\s*name|log" + "inname|user\\s*name|username", "i");
      if (usernamePattern.test(trimmed)) {
        node.nodeValue = value.replace(trimmed, t.username);
      } else if (/password/i.test(trimmed)) {
        node.nodeValue = value.replace(trimmed, t.password);
      } else if (/go\s+back|^back$/i.test(trimmed)) {
        node.nodeValue = value.replace(trimmed, t.back);
      } else if (/register\s+new\s+user/i.test(trimmed)) {
        node.nodeValue = value.replace(trimmed, t.register);
      }
    });
  }

  function placeholderForInput(input) {
    var t = getCopy();
    var label = "";
    var labelNode = input.closest("label");
    if (labelNode) label = labelNode.textContent || "";
    if (!label && input.id) {
      var escapedId = window.CSS && CSS.escape ? CSS.escape(input.id) : input.id.replace(/"/g, '\\"');
      var explicit = document.querySelector('label[for="' + escapedId + '"]');
      if (explicit) label = explicit.textContent || "";
    }

    var name = (label + " " + (input.name || "") + " " + (input.id || "")).toLowerCase();
    if (/first/.test(name)) return t.firstName;
    if (/last/.test(name)) return t.lastName;
    if (/e-?mail|email/.test(name)) return "name@example.com";
    if (/phone|mobile/.test(name)) return "+971";
    if (/code|otp|verification/.test(name)) return t.verificationCode;
    if (input.type === "password") return t.passwordPlaceholder;
    return t.usernamePlaceholder;
  }

  function enhanceForm() {
    var t = getCopy();
    var form = document.querySelector("form");
    if (!form) return;

    form.classList.add("mass-login-form");

    var formHost = form.parentElement;
    if (formHost) formHost.classList.add("mass-login-form-host");

    var shell = form.closest('[class*="bg-background-light"]') ||
      form.closest('[class*="bg-"]') ||
      (formHost && formHost.parentElement && formHost.parentElement.parentElement);

    if (shell) {
      shell.classList.add("mass-login-card-shell");
      if (shell.parentElement) shell.parentElement.classList.add("mass-login-card-frame");
    }

    form.setAttribute("data-mass-footer", t.footer);
    Array.from(form.querySelectorAll("input")).forEach(function (input) {
      input.classList.add("mass-login-input");
      input.removeAttribute("autofocus");
      if (input.type === "password") {
        input.setAttribute("autocomplete", "current-password");
      } else {
        input.setAttribute("autocomplete", /mail/i.test(input.name || input.id || "") ? "email" : "username");
      }
      input.setAttribute("placeholder", placeholderForInput(input));
    });

    Array.from(form.querySelectorAll("label")).forEach(function (label) {
      label.classList.add("mass-login-label");
    });

    var buttons = Array.from(form.querySelectorAll("button"));
    buttons.forEach(function (button) {
      var label = (button.textContent || "").trim();
      var type = (button.getAttribute("type") || "").toLowerCase();
      if (type === "submit" || /continue|next|\u0645\u062a\u0627\u0628\u0639\u0629/i.test(label)) {
        button.classList.add("mass-login-submit");
        button.setAttribute("aria-label", t.continueLabel);
      } else if (/go\s+back|^back$|\u0631\u062c\u0648\u0639/i.test(label)) {
        button.classList.add("mass-login-back");
      }
    });

    Array.from(form.querySelectorAll("a")).forEach(function (link) {
      var label = (link.textContent || "").trim();
      if (/register/i.test(label)) {
        link.classList.add("mass-login-register");
      }
    });

    var actionParent = buttons.map(function (button) {
      return button.parentElement;
    }).find(function (parent) {
      return parent && parent.querySelector(".mass-login-submit") && parent.querySelector(".mass-login-back");
    });
    if (!actionParent && buttons.length) actionParent = buttons[0].parentElement;
    if (actionParent) actionParent.classList.add("mass-login-action-row");

    var pageShell = form;
    while (pageShell && pageShell.parentElement && pageShell.parentElement !== document.body) {
      pageShell = pageShell.parentElement;
    }
    if (pageShell && pageShell.parentElement === document.body) {
      pageShell.classList.add("mass-login-page-shell");
    } else {
      pageShell = document.querySelector("body > div:not(.mass-login-brand-panel)");
    }
    if (pageShell && shell) {
      var cardPathNode = shell;
      while (cardPathNode && cardPathNode !== pageShell) {
        cardPathNode.classList.add("mass-login-card-path");
        cardPathNode = cardPathNode.parentElement;
      }
    }

    ensureExternalLegal(t);
  }

  function ensureExternalLegal(t) {
    if (!document.body) return;
    var legal = document.querySelector("body > nav.mass-login-legal-links");
    if (!legal) {
      legal = document.createElement("nav");
      legal.className = "mass-login-legal-links";
      legal.setAttribute("aria-label", "Mass Data SSO legal links");
      document.body.appendChild(legal);
    }
    var locale = isRtl() ? "ar" : "en";
    if (legal.dataset.massLocale === locale) return;
    legal.dataset.massLocale = locale;
    legal.innerHTML = t.legal.map(function (item) {
      return '<span class="mass-login-legal-link">' + item + "</span>";
    }).join("<span></span>");
  }

  function setPageKindClass() {
    if (!document.body) return;
    var kind = pageKind();
    document.body.classList.toggle("mass-login-register-page", kind === "register");
    document.body.classList.toggle("mass-login-password-page", kind === "password");
    document.body.classList.toggle("mass-login-login-page", kind === "login");
  }

  function installObserver() {
    if (!document.body || window.__massLoginObserverInstalled) return;
    window.__massLoginObserverInstalled = true;

    function schedule() {
      window.setTimeout(enhance, 900);
      window.setTimeout(enhance, 1800);
    }

    ["pushState", "replaceState"].forEach(function (name) {
      var original = history[name];
      if (typeof original !== "function") return;
      history[name] = function () {
        var result = original.apply(this, arguments);
        setTimeout(schedule, 50);
        setTimeout(schedule, 400);
        return result;
      };
    });
    window.addEventListener("popstate", schedule);
    document.addEventListener("submit", schedule, true);
    document.addEventListener("click", function (event) {
      var target = event.target && event.target.closest && event.target.closest("button, a");
      if (!target) return;
      if (target.matches('[type="submit"], [data-testid="register-button"]') || /continue|next|register|back|\u0645\u062a\u0627\u0628\u0639\u0629|\u062a\u0633\u062c\u064a\u0644|\u0631\u062c\u0648\u0639/i.test(target.textContent || "")) {
        schedule();
      }
    }, true);
  }

  function stabilizeInitialMobileScroll() {
    if (window.innerWidth > 920) return;
    var key = window.location.pathname + window.location.search;
    if (window.__massLoginInitialScrollKey === key) return;
    window.__massLoginInitialScrollKey = key;

    [60, 280, 900].forEach(function (delay) {
      window.setTimeout(function () {
        if (window.scrollY <= 0) return;
        var form = document.querySelector("form.mass-login-form");
        if (form && form.contains(document.activeElement)) {
          document.activeElement.blur();
        }
        window.scrollTo(0, 0);
      }, delay);
    });
  }

  function enhance() {
    setTheme();
    createPanel();
    setPageKindClass();
    enhanceForm();
    installObserver();
    stabilizeInitialMobileScroll();
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
