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
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    if (mobileOverlay) mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
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
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const img = el.querySelector('img');
        if (img) img.style.transform = `translateY(${scrollY * speed}px) scale(1.1)`;
      });
    }, { passive: true });
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
  // 16. PRODUCT MODAL
  // =============================================
  // Create modal container
  const modalHTML = `
    <div class="modal-overlay" id="productModal">
      <div class="modal-content">
        <button class="modal-close" id="modalClose">✕</button>
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
            <button class="cta-button" id="modalWhatsApp" onclick="window.open('https://wa.me/6281234567890','_blank')" style="flex:1;justify-content:center;">WhatsApp <span class="arrow">→</span></button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('productModal');
  const modalClose = document.getElementById('modalClose');

  function openModal(productId) {
    if (typeof PRODUCTS === 'undefined') return;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

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

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeCart(); } });

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
  // 17. SHOPPING CART SIDEBAR
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
        <button class="cart-checkout" onclick="window.open('https://wa.me/6281234567890?text='+encodeURIComponent('Halo B.Collony, saya ingin order:\\n'+document.getElementById('cartItems').innerText),'_blank')">Checkout via WhatsApp</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', cartSidebarHTML);

  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartClose');

  function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartItems();
  }

  function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
    if (!modal.classList.contains('active')) document.body.style.overflow = '';
  }

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

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
  }

  // Make renderCartItems globally accessible
  window.renderCartItems = renderCartItems;

  // Init cart badge
  Cart.updateBadge();

  // =============================================
  // 18. BODY REVEAL
  // =============================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });

});
