"use strict";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mainNav = document.querySelector("#main-nav");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const revealItems = [...document.querySelectorAll("[data-reveal]")];
const languageLinks = [...document.querySelectorAll("[data-language-choice]")];
const isEnglishPage = document.documentElement.lang.toLowerCase().startsWith("en");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeColor = document.querySelector('meta[name="theme-color"]');

const setTheme = (theme, save = true) => {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  const label = isEnglishPage
    ? (dark ? "Enable light theme" : "Enable dark theme")
    : (dark ? "Ativar tema claro" : "Ativar tema escuro");
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", label);
  themeToggle.title = label;
  themeColor.content = dark ? "#101416" : "#ffffff";
  if (save) {
    try {
      localStorage.setItem("preferred-theme", document.documentElement.dataset.theme);
    } catch {}
  }
};

setTheme(document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), false);
themeToggle.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

if (window.location.protocol === "file:") {
  const pathname = window.location.pathname;
  const isBlogPage = /\/blog\/index\.html$/.test(pathname);
  const isResumePage = /\/(curriculo|resume)\/index\.html$/.test(pathname);
  const localLanguagePaths = isEnglishPage
    ? {
        en: "./index.html",
        pt: isResumePage ? "../../curriculo/index.html" : isBlogPage ? "../../blog/index.html" : "../index.html",
      }
    : {
        en: isResumePage ? "../en/resume/index.html" : isBlogPage ? "../en/blog/index.html" : "./en/index.html",
        pt: "./index.html",
      };

  languageLinks.forEach((link) => {
    const targetPath = localLanguagePaths[link.dataset.languageChoice];
    if (targetPath) link.href = targetPath;
  });
}

languageLinks.forEach((link) => {
  link.addEventListener("click", () => {
    try {
      localStorage.setItem("preferred-language", link.dataset.languageChoice);
    } catch {}
  });
});

const closeMenu = () => {
  if (!mainNav || !menuToggle) return;
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));

} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
