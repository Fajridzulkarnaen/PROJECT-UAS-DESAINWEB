/* ============================================
   B.COLLONY PARFUME — MPA Interactive JavaScript
   Shared across all pages
   ============================================ */

// =============================================
// SHOPPING CART (localStorage-based)
// =============================================
const Cart = {
  KEY: 'bcollony_cart',

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch { return []; }
  },

  save(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  add(productId) {
    const items = this.getItems();
    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ id: productId, qty: 1 });
    }
    this.save(items);
    return items;
  },

  remove(productId) {
    const items = this.getItems().filter(i => i.id !== productId);
    this.save(items);
    return items;
  },

  updateQty(productId, delta) {
    const items = this.getItems();
    const item = items.find(i => i.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) return this.remove(productId);
    }
    this.save(items);
    return items;
  },

  getTotal() {
    const items = this.getItems();
    if (typeof PRODUCTS === 'undefined') return 0;
    return items.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  },

  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.classList.toggle('show', count > 0);
    });
  }
};

// =============================================
// MAIN APP
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  let lockedPageScrollTop = 0;
  const pageScrollLocks = new Set();

  function lockPageScroll(lockName) {
    if (!pageScrollLocks.size) {
      lockedPageScrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      document.documentElement.classList.add('page-scroll-locked');
      document.body.classList.add('page-scroll-locked');
      document.body.style.top = `-${lockedPageScrollTop}px`;
      document.body.style.overflow = 'hidden';
    }

    pageScrollLocks.add(lockName);
  }

  function unlockPageScroll(lockName) {
    if (!pageScrollLocks.has(lockName)) return;

    pageScrollLocks.delete(lockName);
    if (pageScrollLocks.size) return;

    document.documentElement.classList.remove('page-scroll-locked');
    document.body.classList.remove('page-scroll-locked');
    document.body.style.top = '';
    document.body.style.overflow = '';
    // Override the global `scroll-behavior: smooth` while restoring the page.
    // Closing an overlay should reveal the exact previous position immediately.
    window.scrollTo({ top: lockedPageScrollTop, left: 0, behavior: 'instant' });
  }

  // =============================================
  // 1. PAGE TRANSITION
  // =============================================
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(() => { window.location.href = href; }, 400);
      });
    }
  });

  // =============================================
  // 2. NAVBAR SCROLL
  // =============================================
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const updateNavbar = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  // =============================================
  // 3. MOBILE MENU
  // =============================================
  const hamburger = document.getElementById('navHamburger');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;
    const shouldOpen = !navMenu.classList.contains('open');

    hamburger.classList.toggle('active', shouldOpen);
    navMenu.classList.toggle('open', shouldOpen);
    if (mobileOverlay) mobileOverlay.classList.toggle('active', shouldOpen);

    if (shouldOpen) {
      lockPageScroll('mobile-menu');
    } else {
      unlockPageScroll('mobile-menu');
    }
  }

  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('open')) toggleMobileMenu();
    });
  });

  // =============================================
  // 4. SCROLL ANIMATIONS
  // =============================================
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => el.classList.add('animate-in'), delay);
        animObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));

  // =============================================
  // 5. FRAGRANCE NOTE BARS
  // =============================================
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-animate-bar]').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animate-in'), i * 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.fragrance-notes').forEach(el => barObserver.observe(el));

  // =============================================
  // 6. PARALLAX
  // =============================================
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    const parallaxMotion = window.matchMedia('(min-width: 769px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let parallaxTicking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      parallaxEls.forEach(el => {
        const img = el.querySelector('img');
        if (!img) return;

        if (!parallaxMotion.matches) {
          img.style.removeProperty('transform');
          return;
        }

        const speed = parseFloat(el.dataset.parallax) || 0.3;
        img.style.transform = `translate3d(0, ${scrollY * speed}px, 0) scale(1.1)`;
      });

      parallaxTicking = false;
    };

    const requestParallaxUpdate = () => {
      if (parallaxTicking) return;
      parallaxTicking = true;
      window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    if (typeof parallaxMotion.addEventListener === 'function') {
      parallaxMotion.addEventListener('change', requestParallaxUpdate);
    } else {
      parallaxMotion.addListener(requestParallaxUpdate);
    }
    updateParallax();
  }

  // =============================================
  // 7. 3D TILT
  // =============================================
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
      const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
      el.style.transition = 'transform 0.1s ease';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
  });

  // =============================================
  // 8. MAGNETIC BUTTONS
  // =============================================
  document.querySelectorAll('.cta-button, .hero-cta').forEach(btn => {
    if (btn.closest('.product-actions')) return;
    if (btn.classList.contains('contact-submit-button')) return;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-rect.left-rect.width/2)*0.2}px, ${(e.clientY-rect.top-rect.height/2)*0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
    });
    btn.addEventListener('mouseenter', () => { btn.style.transition = 'transform 0.1s ease'; });
  });

  // =============================================
  // 9. IMAGE HOVER ZOOM
  // =============================================
  document.querySelectorAll('.product-card-image, .story-block-image, .home-about-image, .product-gallery-main').forEach(container => {
    const img = container.querySelector('img');
    if (!img) return;
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      img.style.transformOrigin = `${((e.clientX-rect.left)/rect.width)*100}% ${((e.clientY-rect.top)/rect.height)*100}%`;
    });
  });

  // =============================================
  // 10. CURSOR GLOW
  // =============================================
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `position:fixed;width:300px;height:300px;background:radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:opacity 0.3s ease;opacity:0;`;
  document.body.appendChild(cursorGlow);
  let cursorVis = false;
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    if (!cursorVis) { cursorGlow.style.opacity = '1'; cursorVis = true; }
  });
  document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; cursorVis = false; });

  // =============================================
  // 11. NEWSLETTER FORM
  // =============================================
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = nlForm.querySelector('.newsletter-btn');
      btn.textContent = 'Subscribed ✓';
      btn.style.background = '#2d7a3a';
      nlForm.querySelector('.newsletter-input').value = '';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 3000);
    });
  }

  // =============================================
  // 12. CONTACT FORM
  // =============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.cta-button');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Message Sent ✓ <span class="arrow">→</span>';
      btn.style.background = '#2d7a3a'; btn.style.borderColor = '#2d7a3a'; btn.style.color = '#fff';
      contactForm.reset();
      setTimeout(() => { btn.innerHTML = orig; btn.style = ''; }, 3000);
    });
  }

  // =============================================
  // 13. SHOP FILTER TABS
  // =============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      productCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        if (show) {
          card.style.display = '';
          card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.16,1,0.3,1)';
            card.style.opacity = '1'; card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0'; card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // =============================================
  // 14. SIZE SELECTOR
  // =============================================
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // =============================================
  // 15. SCROLL INDICATOR
  // =============================================
  const scrollInd = document.querySelector('.scroll-indicator');
  if (scrollInd) {
    window.addEventListener('scroll', () => {
      scrollInd.style.opacity = window.scrollY > 200 ? '0' : '1';
      scrollInd.style.transform = window.scrollY > 200 ? 'translateX(-50%) translateY(20px)' : 'translateX(-50%) translateY(0)';
    }, { passive: true });
  }

  // =============================================
  // 16. BACK TO TOP
  // =============================================
  const backToTop = document.createElement('button');
  backToTop.type = 'button';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Kembali ke atas');
  backToTop.setAttribute('title', 'Kembali ke atas');
  backToTop.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="m18 15-6-6-6 6" />
    </svg>
  `;
  document.body.appendChild(backToTop);

  let backToTopTicking = false;
  const updateBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
    backToTopTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (backToTopTicking) return;
    backToTopTicking = true;
    window.requestAnimationFrame(updateBackToTop);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  updateBackToTop();

  // =============================================
  // 17. PRODUCT MODAL
  // =============================================
  const WHATSAPP_NUMBER = '62895383060656';

  function openWhatsAppMessage(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Create modal container
  const modalHTML = `
    <div class="modal-overlay" id="productModal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="modalName">
      <div class="modal-content" role="document">
        <button class="modal-close" id="modalClose" type="button" aria-label="Close product details">✕</button>
        <div class="modal-image">
          <img id="modalImg" src="" alt="">
        </div>
        <div class="modal-info">
          <div class="modal-badge" id="modalBadge"></div>
          <h2 id="modalName"></h2>
          <div class="modal-characters" id="modalChars"></div>
          <div class="modal-price" id="modalPrice"></div>
          <p class="modal-desc" id="modalDesc"></p>
          <div class="modal-notes" id="modalNotes">
            <h4>Fragrance Notes</h4>
          </div>
          <div class="modal-actions">
            <button class="cta-button filled" id="modalAddCart" style="flex:1;justify-content:center;">Add to Cart <span class="arrow">→</span></button>
            <button class="cta-button" id="modalWhatsApp" type="button" style="flex:1;justify-content:center;">WhatsApp <span class="arrow">→</span></button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');
  const PRODUCT_MODAL_STATE_KEY = 'bcollonyProductModal';
  let modalHistoryActive = false;
  let modalTrigger = null;

  function openModal(productId, { pushHistory = true } = {}) {
    if (typeof PRODUCTS === 'undefined') return;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const wasOpen = modal.classList.contains('active');

    document.getElementById('modalImg').src = product.image;
    document.getElementById('modalImg').alt = product.name;
    document.getElementById('modalName').textContent = product.name;
    document.getElementById('modalPrice').textContent = formatPrice(product.price);
    document.getElementById('modalDesc').textContent = product.description;

    const badgeEl = document.getElementById('modalBadge');
    if (product.badge) {
      badgeEl.textContent = product.badge;
      badgeEl.style.display = '';
    } else {
      badgeEl.style.display = 'none';
    }

    const charsEl = document.getElementById('modalChars');
    charsEl.innerHTML = product.characters.map(c => `<span>${c}</span>`).join('');

    const notesEl = document.getElementById('modalNotes');
    notesEl.innerHTML = `<h4>Fragrance Notes</h4>`;
    if (product.notes) {
      ['top', 'heart', 'base'].forEach(key => {
        if (product.notes[key]) {
          notesEl.innerHTML += `<div class="modal-note-item"><span class="modal-note-label">${key}</span><span class="modal-note-value">${product.notes[key]}</span></div>`;
        }
      });
    }

    document.getElementById('modalAddCart').onclick = () => {
      Cart.add(productId);
      const btn = document.getElementById('modalAddCart');
      btn.innerHTML = 'Added ✓';
      btn.style.background = '#2d7a3a'; btn.style.borderColor = '#2d7a3a';
      setTimeout(() => { btn.innerHTML = 'Add to Cart <span class="arrow">→</span>'; btn.style = 'flex:1;justify-content:center;'; }, 1500);
      renderCartItems();
    };

    document.getElementById('modalWhatsApp').onclick = () => {
      const message = [
        'Halo B.Collony, saya tertarik dengan produk berikut:',
        '',
        `*${product.name}*`,
        `Harga: *${formatPrice(product.price)}*`,
        `Karakter: ${product.characters.join(', ')}`,
        '',
        'Mohon info ketersediaan dan cara pemesanannya. Terima kasih!'
      ].join('\n');

      openWhatsAppMessage(message);
    };

    if (!wasOpen) modalTrigger = document.activeElement;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    lockPageScroll('product-modal');

    if (!wasOpen) {
      if (pushHistory) {
        history.pushState(
          { ...(history.state || {}), [PRODUCT_MODAL_STATE_KEY]: productId },
          '',
          window.location.href
        );
        modalHistoryActive = true;
      } else {
        modalHistoryActive = Boolean(history.state?.[PRODUCT_MODAL_STATE_KEY]);
      }

      window.requestAnimationFrame(() => modalClose?.focus({ preventScroll: true }));
    }
  }

  function hideModal() {
    if (!modal.classList.contains('active')) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    unlockPageScroll('product-modal');
    modalHistoryActive = false;

    if (modalTrigger && document.contains(modalTrigger)) {
      modalTrigger.focus({ preventScroll: true });
    }
    modalTrigger = null;
  }

  function closeModal({ syncHistory = true } = {}) {
    const shouldGoBack = syncHistory
      && modalHistoryActive
      && Boolean(history.state?.[PRODUCT_MODAL_STATE_KEY]);

    hideModal();
    if (shouldGoBack) history.back();
  }

  if (modalClose) modalClose.addEventListener('click', () => closeModal());
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeCart(); } });

  window.addEventListener('popstate', (event) => {
    const productId = event.state?.[PRODUCT_MODAL_STATE_KEY];

    if (modal.classList.contains('active')) {
      if (productId) {
        openModal(productId, { pushHistory: false });
      } else {
        closeModal({ syncHistory: false });
      }
      return;
    }

    // Re-open the same detail when the user moves forward in browser history.
    if (productId) openModal(productId, { pushHistory: false });
  });

  // Click on product cards to open modal
  document.querySelectorAll('.product-card[data-product-id]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-to-cart-btn') || e.target.closest('.view-detail-btn')) return;
      openModal(card.dataset.productId);
    });
  });

  // View detail buttons
  document.querySelectorAll('.view-detail-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (card) openModal(card.dataset.productId);
    });
  });

  // =============================================
  // 18. SHOPPING CART SIDEBAR
  // =============================================
  const cartSidebarHTML = `
    <div class="cart-sidebar-overlay" id="cartOverlay"></div>
    <div class="cart-sidebar" id="cartSidebar">
      <div class="cart-header">
        <h3>Shopping Cart</h3>
        <button class="cart-close" id="cartClose">✕</button>
      </div>
      <div class="cart-items" id="cartItems"></div>
      <div class="cart-footer">
        <div class="cart-total">
          <span class="cart-total-label">Total</span>
          <span class="cart-total-price" id="cartTotal">Rp 0</span>
        </div>
        <button class="cart-checkout" id="cartCheckout" type="button">Checkout via WhatsApp</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', cartSidebarHTML);

  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartClose');
  const cartCheckoutBtn = document.getElementById('cartCheckout');

  function getCartOrderItems() {
    if (typeof PRODUCTS === 'undefined') return [];

    return Cart.getItems().map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return null;

      return {
        product,
        qty: item.qty,
        subtotal: product.price * item.qty
      };
    }).filter(Boolean);
  }

  function buildCartWhatsAppMessage() {
    const orderItems = getCartOrderItems();
    if (!orderItems.length) return '';

    const lines = [
      'Halo B.Collony, saya ingin melakukan pemesanan:',
      '',
      '*DETAIL PESANAN*'
    ];

    orderItems.forEach(({ product, qty, subtotal }, index) => {
      lines.push(
        `${index + 1}. *${product.name}*`,
        `   Jumlah: ${qty}`,
        `   Harga: ${formatPrice(product.price)}`,
        `   Subtotal: *${formatPrice(subtotal)}*`,
        ''
      );
    });

    const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
    lines.push(
      `*TOTAL PESANAN: ${formatPrice(total)}*`,
      '',
      'Mohon konfirmasi ketersediaan produk dan informasi pembayarannya. Terima kasih!'
    );

    return lines.join('\n');
  }

  function checkoutCartViaWhatsApp() {
    const message = buildCartWhatsAppMessage();
    if (!message) return;
    openWhatsAppMessage(message);
  }

  function lockCartPageScroll() {
    lockPageScroll('cart');
  }

  function unlockCartPageScroll() {
    unlockPageScroll('cart');
  }

  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    lockCartPageScroll();
    renderCartItems();
  }

  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    unlockCartPageScroll();
  }

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (cartCheckoutBtn) cartCheckoutBtn.addEventListener('click', checkoutCartViaWhatsApp);

  // Cart icon click
  document.querySelectorAll('.cart-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.productId;
      Cart.add(productId);
      btn.classList.add('added');
      const origText = btn.innerHTML;
      btn.innerHTML = '✓ Added';
      setTimeout(() => { btn.innerHTML = origText; btn.classList.remove('added'); }, 1500);
      renderCartItems();
    });
  });

  function renderCartItems() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    if (!container) return;

    const items = Cart.getItems();
    if (items.length === 0) {
      container.innerHTML = '<div class="cart-empty"><span class="cart-empty-icon">🛒</span>Your cart is empty.<br>Start shopping to add items.</div>';
      if (totalEl) totalEl.textContent = 'Rp 0';
      if (cartCheckoutBtn) cartCheckoutBtn.disabled = true;
      return;
    }

    let html = '';
    items.forEach(item => {
      let product = null;
      if (typeof PRODUCTS !== 'undefined') product = PRODUCTS.find(p => p.id === item.id);
      if (!product) product = { name: item.id, price: 0, image: 'assets/images/bottle.png' };

      html += `
        <div class="cart-item">
          <div class="cart-item-img"><img src="${product.image}" alt="${product.name}"></div>
          <div class="cart-item-info">
            <div class="cart-item-name">${product.name}</div>
            <div class="cart-item-price">${formatPrice(product.price)}</div>
            <div class="cart-item-qty">
              <button onclick="Cart.updateQty('${item.id}',-1);renderCartItems();">−</button>
              <span>${item.qty}</span>
              <button onclick="Cart.updateQty('${item.id}',1);renderCartItems();">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="Cart.remove('${item.id}');renderCartItems();">✕</button>
        </div>
      `;
    });
    container.innerHTML = html;
    if (totalEl) totalEl.textContent = formatPrice(Cart.getTotal());
    if (cartCheckoutBtn) cartCheckoutBtn.disabled = getCartOrderItems().length === 0;
  }

  // Make renderCartItems globally accessible
  window.renderCartItems = renderCartItems;

  // Init cart badge
  Cart.updateBadge();

  // =============================================
  // 19. ANIMATED GOOEY SEARCH BAR
  // =============================================

  // Generate particles HTML
  function generateParticlesHTML(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 10 + 4;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dx = (Math.random() - 0.5) * 50;
      const dy = (Math.random() - 0.5) * 30;
      const delay = Math.random() * 2;
      const dur = Math.random() * 2 + 2;
      html += `<div class="search-particle" style="
        width:${size}px; height:${size}px;
        left:${left}%; top:${top}%;
        --dx:${dx}px; --dy:${dy}px;
        animation-delay:${delay}s;
        animation-duration:${dur}s;
      "></div>`;
    }
    return html;
  }

  const searchOverlayHTML = `
    <svg style="position:absolute;width:0;height:0" aria-hidden="true">
      <defs>
        <filter id="gooey-search">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>
    <div class="search-overlay" id="searchOverlay">
      <div class="search-overlay-header">
        <button class="search-overlay-close" id="searchClose">✕</button>
        <div class="search-overlay-label">Search Fragrances</div>
        <div class="search-bar-wrapper" id="searchBarWrapper">
          <div class="search-bar-glow"></div>
          <div class="search-bar-inner" id="searchBarInner">
            <div class="search-bar-gradient"></div>
            <div class="search-bar-shimmer"></div>
            <div class="search-particles" id="searchParticles">
              ${generateParticlesHTML(14)}
            </div>
            <div class="search-bar-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </div>
            <input type="text" class="search-input" id="searchInput" placeholder="Cari parfum... contoh: Vanilla, Eros, Luxury" autocomplete="off">
            <button type="button" class="search-submit-btn" id="searchSubmitBtn">Search</button>
          </div>
        </div>
      </div>
      <div class="search-results" id="searchResults">
        <div class="search-empty">
          <span class="search-empty-icon">🔍</span>
          <p class="search-empty-text">Ketik nama parfum, karakter, atau kategori<br>untuk menemukan wangi yang kamu cari</p>
          <div class="search-suggestions" id="searchSuggestions">
            <span class="search-suggestion-tag" data-query="Luxury">Luxury</span>
            <span class="search-suggestion-tag" data-query="Sweet">Sweet</span>
            <span class="search-suggestion-tag" data-query="Fresh">Fresh</span>
            <span class="search-suggestion-tag" data-query="Masculine">Masculine</span>
            <span class="search-suggestion-tag" data-query="Feminine">Feminine</span>
            <span class="search-suggestion-tag" data-query="Vanilla">Vanilla</span>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', searchOverlayHTML);

  const searchOverlay = document.getElementById('searchOverlay');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchCloseBtn = document.getElementById('searchClose');
  const searchBarWrapper = document.getElementById('searchBarWrapper');
  const searchBarInner = document.getElementById('searchBarInner');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');

  // Focus/blur handling for gooey animation
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchBarWrapper.classList.add('focused');
    });
    searchInput.addEventListener('blur', () => {
      setTimeout(() => {
        searchBarWrapper.classList.remove('focused');
      }, 200);
    });
  }

  // Submit button visibility
  function updateSubmitBtn() {
    if (!searchSubmitBtn) return;
    if (searchInput.value.trim()) {
      searchSubmitBtn.classList.add('visible');
    } else {
      searchSubmitBtn.classList.remove('visible');
    }
  }

  function applySuggestionQuery(tag) {
    const q = tag.dataset.query;
    if (!q) return;

    searchInput.value = q;
    updateSubmitBtn();
    performSearch(q);
    searchInput.focus();
  }

  if (searchResults) {
    searchResults.addEventListener('pointerdown', (e) => {
      const tag = e.target.closest('.search-suggestion-tag');
      if (!tag || !searchResults.contains(tag)) return;

      e.stopPropagation();
    });

    searchResults.addEventListener('click', (e) => {
      const tag = e.target.closest('.search-suggestion-tag');
      if (!tag || !searchResults.contains(tag)) return;

      e.preventDefault();
      e.stopPropagation();
      applySuggestionQuery(tag);
    });

    searchResults.addEventListener('keydown', (e) => {
      const tag = e.target.closest('.search-suggestion-tag');
      if (!tag || !searchResults.contains(tag)) return;
      if (e.key !== 'Enter' && e.key !== ' ') return;

      e.preventDefault();
      e.stopPropagation();
      applySuggestionQuery(tag);
    });
  }

  // Click ripple + burst effect on search bar
  if (searchBarInner) {
    searchBarInner.addEventListener('click', (e) => {
      const rect = searchBarInner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Ripple
      const ripple = document.createElement('div');
      ripple.className = 'search-click-ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '60px';
      ripple.style.height = '60px';
      ripple.style.marginLeft = '-30px';
      ripple.style.marginTop = '-30px';
      searchBarInner.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);

      // Burst particles
      for (let i = 0; i < 10; i++) {
        const bp = document.createElement('div');
        bp.className = 'search-burst-particle';
        const bx = (Math.random() - 0.5) * 120;
        const by = (Math.random() - 0.5) * 80;
        const hue = 40 + Math.random() * 20; // gold hue range
        bp.style.left = x + 'px';
        bp.style.top = y + 'px';
        bp.style.setProperty('--bx', bx + 'px');
        bp.style.setProperty('--by', by + 'px');
        bp.style.background = `hsla(${hue}, 70%, 55%, 0.8)`;
        bp.style.boxShadow = `0 0 6px hsla(${hue}, 70%, 55%, 0.6)`;
        searchBarInner.appendChild(bp);
        setTimeout(() => bp.remove(), 700);
      }
    });
  }

  // Submit button click
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener('click', () => {
      if (searchInput.value.trim()) {
        performSearch(searchInput.value);
        // Animate search icon
        const iconSvg = searchBarWrapper.querySelector('.search-bar-icon svg');
        if (iconSvg) {
          iconSvg.style.transition = 'transform 0.5s ease';
          iconSvg.style.transform = 'rotate(360deg) scale(1.3)';
          setTimeout(() => {
            iconSvg.style.transform = 'rotate(0deg) scale(1)';
          }, 500);
        }
      }
    });
  }

  function openSearch() {
    bindSuggestionTags();
    searchOverlay.classList.add('active');
    lockPageScroll('search');
    setTimeout(() => {
      searchInput.focus();
      searchBarWrapper.classList.add('focused');
    }, 300);
  }

  function closeSearch() {
    searchOverlay.classList.remove('active');
    searchBarWrapper.classList.remove('focused');
    unlockPageScroll('search');
    searchInput.value = '';
    updateSubmitBtn();
    renderSearchDefault();
  }

  function renderSearchDefault() {
    searchResults.innerHTML = `
      <div class="search-empty">
        <span class="search-empty-icon">🔍</span>
        <p class="search-empty-text">Ketik nama parfum, karakter, atau kategori<br>untuk menemukan wangi yang kamu cari</p>
        <div class="search-suggestions" id="searchSuggestions">
          <span class="search-suggestion-tag" data-query="Luxury">Luxury</span>
          <span class="search-suggestion-tag" data-query="Sweet">Sweet</span>
          <span class="search-suggestion-tag" data-query="Fresh">Fresh</span>
          <span class="search-suggestion-tag" data-query="Masculine">Masculine</span>
          <span class="search-suggestion-tag" data-query="Feminine">Feminine</span>
          <span class="search-suggestion-tag" data-query="Vanilla">Vanilla</span>
        </div>
      </div>
    `;
    bindSuggestionTags();
  }

  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function performSearch(query) {
    if (typeof PRODUCTS === 'undefined') return;
    const q = query.toLowerCase().trim();

    if (!q) {
      renderSearchDefault();
      return;
    }

    const results = PRODUCTS.filter(p => {
      const searchable = [
        p.name,
        p.category,
        p.description,
        ...p.characters,
        p.badge || '',
        p.notes ? Object.values(p.notes).join(' ') : ''
      ].join(' ').toLowerCase();
      return searchable.includes(q);
    });

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-empty">
          <span class="search-empty-icon">😔</span>
          <p class="search-empty-text">Tidak ada parfum yang cocok dengan "<strong>${query}</strong>"<br>Coba kata kunci lain</p>
          <div class="search-suggestions" id="searchSuggestions">
            <span class="search-suggestion-tag" data-query="Women">Women</span>
            <span class="search-suggestion-tag" data-query="Men">Men</span>
            <span class="search-suggestion-tag" data-query="Unisex">Unisex</span>
            <span class="search-suggestion-tag" data-query="Gourmand">Gourmand</span>
          </div>
        </div>
      `;
      bindSuggestionTags();
      return;
    }

    let html = `<div class="search-results-count">${results.length} parfum ditemukan</div><div class="search-results-grid">`;
    results.forEach(p => {
      html += `
        <div class="search-result-item" data-product-id="${p.id}">
          <div class="search-result-img"><img src="${p.image}" alt="${p.name}"></div>
          <div class="search-result-info">
            <div class="search-result-name">${highlightText(p.name, query)}</div>
            <div class="search-result-chars">${p.characters.join(' • ')}</div>
            <div class="search-result-price">${formatPrice(p.price)}</div>
          </div>
          ${p.badge ? `<span class="search-result-badge">${p.badge}</span>` : ''}
        </div>
      `;
    });
    html += '</div>';
    searchResults.innerHTML = html;

    // Click result to open modal
    searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const pid = item.dataset.productId;
        closeSearch();
        setTimeout(() => openModal(pid), 300);
      });
    });
  }

  function bindSuggestionTags() {
    searchResults.querySelectorAll('.search-suggestion-tag').forEach(tag => {
      tag.setAttribute('role', 'button');
      tag.tabIndex = 0;
    });
  }

  // Search icon click
  document.querySelectorAll('.search-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);
  if (searchOverlay) searchOverlay.addEventListener('click', (e) => { if (e.target === searchOverlay) closeSearch(); });

  // Live search with debounce
  let searchTimer;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      updateSubmitBtn();
      searchTimer = setTimeout(() => performSearch(searchInput.value), 200);
    });
    // Enter key to search
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(searchInput.value);
      }
    });
  }

  // Search overlay Escape handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (searchOverlay.classList.contains('active')) { closeSearch(); return; }
      closeModal(); closeCart();
    }
  });

  bindSuggestionTags();

  // =============================================
  // 20. BODY REVEAL
  // =============================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });

});
