(function () {
  const docEl = document.documentElement;
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const themeToggle = document.getElementById("theme-toggle");
  const yearSpan = document.getElementById("year");

  // Año en footer
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Estado inicial de tema
  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
  setTheme(initialTheme);

  function setTheme(mode) {
    docEl.setAttribute("data-theme", mode);
    localStorage.setItem("theme", mode);
    themeToggle?.setAttribute("aria-label", mode === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }

  themeToggle?.addEventListener("click", () => {
    const next = docEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
  });

  // Menú móvil
  navToggle?.addEventListener("click", () => {
    const isOpen = navList?.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  // Cerrar menú móvil al navegar
  document.querySelectorAll('.nav-list a[href^="#"]').forEach((a) => {
    a.addEventListener("click", () => {
      navList?.classList.remove("show");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const targetId = a.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Resaltar enlace activo en scroll
  const sectionIds = ["#inicio", "#proyectos", "#sobre-mi", "#contacto"];
  const sectionEls = sectionIds.map((id) => document.querySelector(id)).filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll(".nav-list a"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
  );
  sectionEls.forEach((el) => observer.observe(el));

  // Formulario (placeholder)
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log("Mensaje enviado:", data);
    alert("¡Gracias! Te responderé pronto.");
    form.reset();
  });
})();