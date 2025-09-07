// Simple and clean functionality
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Simple search functionality
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const productCards = document.querySelectorAll(".product-card");

      productCards.forEach((card) => {
        const productName = card
          .querySelector(".product-title")
          .textContent.toLowerCase();
        const productDescription = card
          .querySelector(".product-description")
          .textContent.toLowerCase();

        if (
          productName.includes(searchTerm) ||
          productDescription.includes(searchTerm)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Filters (by category)
  const filterPills = document.querySelectorAll(".filter-pill");
  filterPills.forEach((pill) => {
    pill.addEventListener("click", function () {
      const category = this.getAttribute("data-category");
      filterPills.forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      filterProducts(category);
    });
  });

  // Simple contact form
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
      this.reset();
    });
  }

  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu on link click
  if (navMenu) {
    navMenu.addEventListener("click", function (e) {
      if (e.target.matches("a")) {
        navMenu.classList.remove("active");
      }
    });
  }

  // Responsive images: sizes attribute for better selection
  document.querySelectorAll("img.product-image").forEach(function (img) {
    img.setAttribute("sizes", "(max-width: 768px) 100vw, 400px");
  });

  // Render testimonials
  renderTestimonials();

  // Render FAQ
  renderFAQ();

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = newsletterForm.querySelector(".newsletter-input");
      if (input && input.value.trim()) {
        alert("Спасибо за подписку! Проверьте почту для подтверждения.");
        input.value = "";
      }
    });
  }
});

// Simple product data
const products = [
  {
    id: 1,
    name: "Увлажняющий крем для лица",
    price: "1,200 ₽",
    description: "Интенсивное увлажнение для всех типов кожи",
    image:
      "https://images.unsplash.com/photo-1616789914314-0f4348a0d17b?q=80&w=1200&auto=format&fit=crop",
    category: "skincare",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 2,
    name: "Тональный крем",
    price: "1,500 ₽",
    description: "Легкое покрытие с SPF 30",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop",
    category: "makeup",
    rating: 4.6,
    isNew: false,
  },
  {
    id: 3,
    name: "Маска для лица",
    price: "800 ₽",
    description: "Очищающая маска с глиной",
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop",
    category: "skincare",
    rating: 4.5,
    isNew: false,
  },
  {
    id: 4,
    name: "Тушь для ресниц",
    price: "900 ₽",
    description: "Объемная тушь с эффектом наращивания",
    image:
      "https://images.unsplash.com/photo-1596464716121-e9a93b6f2f9b?q=80&w=1200&auto=format&fit=crop",
    category: "makeup",
    rating: 4.7,
    isNew: true,
  },
];

// Simple product rendering
function renderProducts(category = "all") {
  const productsContainer = document.querySelector(".products-grid");
  if (!productsContainer) return;

  const filtered = products.filter((p) => {
    if (category === "all") return true;
    if (category === "new") return p.isNew;
    return p.category === category;
  });

  productsContainer.innerHTML = filtered
    .map(
      (product) => `
        <div class="product-card">
            <img src="https://images.weserv.nl/?url=${encodeURIComponent(
              product.image.replace("https://", "")
            )}&w=1200&q=80" alt="${
        product.name
      }" class="product-image" loading="lazy" referrerpolicy="no-referrer" decoding="async" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'1200\' height=\'800\'><rect fill=\'%23ffffff\' width=\'100%25\' height=\'100%25\'/><text x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'%238c52ff\' font-family=\'Poppins,Segoe UI\' font-size=\'24\'>Изображение недоступно</text></svg>'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-rating">${"★".repeat(
                  Math.round(product.rating)
                )}${"☆".repeat(
        5 - Math.round(product.rating)
      )} <span aria-label="рейтинг">(${product.rating.toFixed(1)})</span></p>
                <button class="btn" onclick="contactUs('${
                  product.name
                }')">Узнать больше</button>
            </div>
        </div>
    `
    )
    .join("");
}

// Simple contact function
function contactUs(productName) {
  alert(
    `Для заказа "${productName}" свяжитесь с нами по телефону +373 12345678 или напишите на info@kxnbeauty.ru`
  );
}

// Initialize products on page load
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
});

function filterProducts(category) {
  renderProducts(category);
}

// Testimonials data
const testimonials = [
  {
    name: "Анна",
    text: "Потрясающее качество! Кожа стала заметно лучше уже через неделю использования.",
    avatar:
      "https://images.weserv.nl/?url=images.unsplash.com/photo-1544005313-94ddf0286df2&auto=format&fit=crop&w=200&q=60",
    rating: 5,
  },
  {
    name: "Мария",
    text: "Очень нравится сервис и быстрая доставка. Помогли подобрать идеальный уход.",
    avatar:
      "https://images.weserv.nl/?url=images.unsplash.com/photo-1547425260-76bcadfb4f2c&auto=format&fit=crop&w=200&q=60",
    rating: 5,
  },
  {
    name: "Екатерина",
    text: "Хорошие цены и отличные продукты. Обязательно закажу снова!",
    avatar:
      "https://images.weserv.nl/?url=images.unsplash.com/photo-1554151228-14d9def656e4&auto=format&fit=crop&w=200&q=60",
    rating: 4,
  },
];

function renderTestimonials() {
  const grid = document.querySelector(".testimonials-grid");
  if (!grid) return;
  grid.innerHTML = testimonials
    .map(
      (t) => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <img src="${t.avatar}" alt="${
        t.name
      }" class="testimonial-avatar" loading="lazy" referrerpolicy="no-referrer" decoding="async" />
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="stars">${"★".repeat(t.rating)}${"☆".repeat(
        5 - t.rating
      )}</div>
          </div>
        </div>
        <p>${t.text}</p>
      </div>
      `
    )
    .join("");
}

// FAQ data
const faqItems = [
  {
    q: "Какие способы доставки доступны?",
    a: "Мы доставляем по всей стране курьерскими службами и почтой. Сроки 2-7 дней в зависимости от региона.",
  },
  {
    q: "Можно ли оформить возврат?",
    a: "Да, вы можете вернуть товар в течение 14 дней при сохранении товарного вида и упаковки.",
  },
  {
    q: "Как подобрать уход?",
    a: "Напишите нам в чат или по email — консультант поможет выбрать продукты под ваш тип кожи.",
  },
];

function renderFAQ() {
  const list = document.querySelector(".faq-list");
  if (!list) return;
  list.innerHTML = faqItems
    .map(
      (item, idx) => `
      <div class="faq-item" data-idx="${idx}">
        <button class="faq-question" aria-expanded="false">${item.q}</button>
        <div class="faq-answer">${item.a}</div>
      </div>
    `
    )
    .join("");

  list.addEventListener("click", function (e) {
    const btn = e.target.closest(".faq-question");
    if (!btn) return;
    const item = btn.parentElement;
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach((i) => {
      i.classList.remove("open");
      i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });
    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
}
