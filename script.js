"use strict";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mainNav = document.querySelector("#main-nav");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const sections = [...document.querySelectorAll("main section[id]")];
const revealItems = [...document.querySelectorAll("[data-reveal]")];

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

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  sections.forEach((section) => navObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
