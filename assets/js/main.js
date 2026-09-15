// Se uma imagem falhar ao carregar (arquivo faltando, link quebrado após o
// upload), esconde o elemento em vez de deixar o ícone de "imagem quebrada"
// visível — a página continua legível mesmo com um asset faltando.
document.addEventListener(
  "error",
  (event) => {
    if (event.target instanceof HTMLImageElement) {
      event.target.style.display = "none";
    }
  },
  true,
);

const cookieBanner = document.querySelector("#cookie-banner");
const cookieAccept = document.querySelector("#cookie-accept");
const COOKIE_CONSENT_KEY = "eurotruck-cookie-consent";

if (cookieBanner && cookieAccept) {
  if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
    cookieBanner.hidden = false;
  }

  cookieAccept.addEventListener("click", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "1");
    cookieBanner.hidden = true;
  });
}

const textarea = document.querySelector("#mensagem");
const charCount = document.querySelector("[data-char-count]");

if (textarea && charCount) {
  const max = parseInt(textarea.getAttribute("maxlength"), 10);
  const counter = charCount.closest(".char-counter");

  textarea.addEventListener("input", () => {
    const remaining = max - textarea.value.length;
    charCount.textContent = remaining;
    counter.classList.toggle("is-low", remaining <= 50 && remaining > 0);
    counter.classList.toggle("is-empty", remaining === 0);
  });
}

const contactForm = document.querySelector("#contato-form");

if (contactForm) {
  const statusEl = contactForm.querySelector("[data-form-status]");
  const submitBtn = contactForm.querySelector(".form-submit");

  const statusText = (key) => {
    const lang = localStorage.getItem("eurotruck-lang") || "pt";
    const dict = typeof translations !== "undefined" ? translations[lang] || translations.pt : null;
    return (dict && dict[key]) || "";
  };

  const showStatus = (ok, key) => {
    statusEl.hidden = false;
    statusEl.textContent = statusText(key);
    statusEl.classList.toggle("is-success", ok);
    statusEl.classList.toggle("is-error", !ok);
  };

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    statusEl.hidden = false;
    statusEl.classList.remove("is-success", "is-error");
    statusEl.textContent = statusText("form_status_sending");
    submitBtn.disabled = true;

    fetch(contactForm.action, {
      method: "POST",
      headers: { "X-Requested-With": "XMLHttpRequest" },
      body: new FormData(contactForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.ok) {
          showStatus(true, "form_status_success");
          contactForm.reset();
          if (textarea && charCount) {
            charCount.textContent = textarea.getAttribute("maxlength");
          }
        } else {
          showStatus(false, "form_status_error");
        }
      })
      .catch(() => {
        showStatus(false, "form_status_error");
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });
}

const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const lightbox = document.querySelector("#lightbox");

if (lightbox) {
  const stage = lightbox.querySelector("[data-lightbox-stage]");
  const titleEl = lightbox.querySelector(".lightbox-title");
  const counterEl = lightbox.querySelector("[data-lightbox-counter]");
  const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
  const nextBtn = lightbox.querySelector("[data-lightbox-next]");
  const closeBtn = lightbox.querySelector("[data-lightbox-close]");

  let slides = [];
  let index = 0;
  let lastTrigger = null;

  function renderSlide() {
    stage.innerHTML = "";
    const slide = slides[index].cloneNode(true);
    slide.removeAttribute("style");
    stage.appendChild(slide);
    counterEl.textContent = slides.length > 1 ? `${index + 1} / ${slides.length}` : "";
    const hasMultiple = slides.length > 1;
    prevBtn.hidden = !hasMultiple;
    nextBtn.hidden = !hasMultiple;
  }

  function openLightbox(trigger) {
    const found = trigger.querySelectorAll(".hero-showcase-slide, .gallery-slide");
    if (!found.length) return;

    slides = Array.from(found);
    index = 0;
    lastTrigger = trigger;
    titleEl.textContent = trigger.getAttribute("data-lightbox-title") || "";
    renderSlide();
    lightbox.showModal();
  }

  function showRelative(delta) {
    index = (index + delta + slides.length) % slides.length;
    renderSlide();
  }

  document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    if (!trigger.hasAttribute("aria-label")) {
      const title = trigger.getAttribute("data-lightbox-title") || "";
      trigger.setAttribute("aria-label", `Ver fotos: ${title}`);
    }
    trigger.addEventListener("click", () => openLightbox(trigger));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(trigger);
      }
    });
  });

  document.querySelectorAll("[data-lightbox-for]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.getAttribute("data-lightbox-for"));
      const trigger = target && target.querySelector("[data-lightbox]");
      if (trigger) openLightbox(trigger);
    });
  });

  prevBtn.addEventListener("click", () => showRelative(-1));
  nextBtn.addEventListener("click", () => showRelative(1));
  closeBtn.addEventListener("click", () => lightbox.close());

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showRelative(-1);
    if (event.key === "ArrowRight") showRelative(1);
  });

  lightbox.addEventListener("close", () => {
    if (lastTrigger) {
      lastTrigger.focus();
    }
  });
}

// Entrada suave ao rolar a página (fade + slide-up). A classe "reveal"
// (que esconde o elemento) só é adicionada aqui, nunca no HTML/CSS — se
// esse script não rodar por qualquer motivo, nada fica invisível.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const revealSelector = [
    ".section-heading",
    ".service-card",
    ".metric",
    ".steps li",
    ".client-card",
    ".faq-item",
    ".featured-post",
    ".news-card",
    ".hero-showcase",
    ".solucao-content-frame",
    ".solucao-contato-wrap",
    ".post-header",
    ".post-body",
  ].join(", ");

  const revealEls = document.querySelectorAll(revealSelector);

  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealEls.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-i", i % 6);
      revealObserver.observe(el);
    });
  }
}
