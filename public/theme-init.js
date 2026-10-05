// Runs before first paint so the page never flashes the wrong theme.
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.dataset.theme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#fbfbfa" : "#09090b");
  } catch {
    /* storage blocked: CSS falls back to prefers-color-scheme */
  }
})();
