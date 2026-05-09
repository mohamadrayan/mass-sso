(function () {
  var criticalCss = [
    "html,body{color-scheme:light!important;background:#fcfcfc!important;color:#1a1a1a!important;--mdc-checkbox-selected-icon-color:#92722a!important;--mdc-checkbox-selected-focus-icon-color:#92722a!important;--mdc-checkbox-selected-hover-icon-color:#92722a!important;--mdc-checkbox-selected-pressed-icon-color:#92722a!important}",
    "button.nav-toggle.active,.nav-toggle.active{background:#92722a!important;border-color:#92722a!important;color:#fff!important}",
    "button.nav-toggle.active *,.nav-toggle.active *{color:#fff!important}",
    ".mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__background{background:#92722a!important;border-color:#92722a!important}",
    ".mat-mdc-raised-button.mat-primary,.mdc-button--raised,button[color='primary']{background:#92722a!important;border-color:#92722a!important;color:#fff!important}",
    ".nav-item.active,.nav-item.router-link-active{background:#92722a!important;border-color:#92722a!important;color:#fff!important}",
    ".mat-mdc-outlined-button,.mat-mdc-button.mat-primary,.mdc-button--outlined{border-color:#92722a!important;color:#92722a!important}"
  ].join("\n");

  function installCriticalCss() {
    var style = document.getElementById("mass-console-critical-theme");
    if (!style) {
      style = document.createElement("style");
      style.id = "mass-console-critical-theme";
      document.head.appendChild(style);
    }
    style.textContent = criticalCss;
  }

  try {
    localStorage.setItem("theme", "light-theme");
    localStorage.setItem("cp-theme", "light");
    document.documentElement.classList.remove("dark", "dark-theme");
    document.documentElement.classList.add("light-theme");
    document.documentElement.style.colorScheme = "light";
    installCriticalCss();
    window.addEventListener("load", installCriticalCss);
    setTimeout(installCriticalCss, 500);
    setTimeout(installCriticalCss, 1500);
    setTimeout(installCriticalCss, 3000);
  } catch (_) {
    // Best-effort theme preference override for the vendor Console.
  }
})();
