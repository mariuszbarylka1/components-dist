(function() {
  const BASE = "https://<org>.github.io/onsite-components-dist/latest";

  function loadComponent(name) {
    if (document.querySelector(`script[data-component='${name}']`)) return;

    const script = document.createElement("script");
    script.src = `${BASE}/components/${name}.js`;
    script.dataset.component = name;
    document.head.appendChild(script);
  }

  // Page-specific rules
  if (location.pathname.includes("/orders")) loadComponent("component-a");
  if (window.user && window.user.role === "admin") loadComponent("component-b");
})();
