// Simple interaction: scrolling nav highlights and form stub
document.addEventListener("DOMContentLoaded", () => {
  // fill year
  document.getElementById("year").textContent = new Date().getFullYear();

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // highlight nav on scroll
  const sections = Array.from(document.querySelectorAll("[id]")).filter((s) =>
    ["about", "projects", "work", "contact"].includes(s.id)
  );
  const navLinks = document.querySelectorAll(".nav-link");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + id)
          );
        }
      });
    },
    { threshold: 0.55 }
  );

  sections.forEach((s) => obs.observe(s));

  // contact form (stub)
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    status.textContent = "Mengirim...";
    // Simulasi pengiriman (di dunia nyata, kirim ke server/email)
    setTimeout(() => {
      status.textContent = "Terima kasih — pesan Anda terkirim (simulasi).";
      form.reset();
    }, 700);
  });
});
