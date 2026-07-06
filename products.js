/* ============================================
   B.COLLONY PARFUME — Product Data
   All 23 variants with details
   ============================================ */

const PRODUCTS = [
  // =================== WOMEN ===================
  {
    id: 'vanilla-cake',
    name: 'Vanilla Cake',
    category: 'women',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: 'Popular',
    description: 'Aroma vanilla creamy berpadu dengan sentuhan butter, caramel, dan cake yang lembut. Memberikan kesan hangat, manis, dan sangat nyaman digunakan.',
    characters: ['Sweet', 'Gourmand', 'Comfort'],
    notes: {
      top: 'Butter, Caramel',
      heart: 'Vanilla, Cake',
      base: 'Musk, Cream'
    }
  },
  {
    id: 'zarra',
    name: 'Zarra',
    category: 'women',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Aroma floral fruity modern dengan sentuhan musk yang lembut. Memberikan kesan elegan, bersih, dan feminin untuk digunakan sehari-hari.',
    characters: ['Elegant', 'Fresh', 'Feminine'],
    notes: {
      top: 'Fruity, Citrus',
      heart: 'Floral, Rose',
      base: 'Musk, Powder'
    }
  },
  {
    id: 'baby-cuddle',
    name: 'Baby Cuddle',
    category: 'women',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Wangi lembut seperti bayi dengan perpaduan powder, white musk, dan floral ringan. Memberikan rasa nyaman, bersih, dan menenangkan.',
    characters: ['Soft', 'Powdery', 'Clean'],
    notes: {
      top: 'Powder, Fresh Air',
      heart: 'White Floral, Cotton',
      base: 'White Musk, Soft Wood'
    }
  },
  {
    id: 'scandalous',
    name: 'Scandalous',
    category: 'women',
    price: 79900,
    image: 'assets/images/bottle.png',
    badge: 'Best Seller',
    description: 'Aroma manis dengan perpaduan madu, white floral, vanilla, dan amber yang memikat. Memberikan kesan berani dan elegan.',
    characters: ['Sexy', 'Sweet', 'Luxury'],
    notes: {
      top: 'Honey, Bergamot',
      heart: 'White Floral, Jasmine',
      base: 'Vanilla, Amber, Musk'
    }
  },
  {
    id: 'paris-heiress',
    name: 'Paris Heiress',
    category: 'women',
    price: 69900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Perpaduan fruity floral dengan sentuhan champagne, peach, dan musk yang glamor. Cocok untuk tampilan feminin dan fashionable.',
    characters: ['Glamorous', 'Feminine', 'Fresh'],
    notes: {
      top: 'Champagne, Peach',
      heart: 'Fruity Floral, Lily',
      base: 'Musk, Sandalwood'
    }
  },
  {
    id: 'ysl-libre',
    name: 'YSL Libre',
    category: 'women',
    price: 89900,
    image: 'assets/images/bottle.png',
    badge: 'Premium',
    description: 'Perpaduan lavender, orange blossom, vanilla, dan musk yang menghadirkan aroma elegan, modern, dan penuh percaya diri.',
    characters: ['Elegant', 'Feminine', 'Luxury'],
    notes: {
      top: 'Lavender, Mandarin',
      heart: 'Orange Blossom, Jasmine',
      base: 'Vanilla, Musk, Cedar'
    }
  },
  {
    id: 'black-opium',
    name: 'Black Opium',
    category: 'women',
    price: 89900,
    image: 'assets/images/bottle.png',
    badge: 'Best Seller',
    description: 'Perpaduan coffee, vanilla, jasmine, dan white flower yang memberikan aroma misterius, elegan, dan mewah.',
    characters: ['Sexy', 'Mysterious', 'Luxury'],
    notes: {
      top: 'Coffee, Pink Pepper',
      heart: 'Jasmine, White Flower',
      base: 'Vanilla, Patchouli, Cedar'
    }
  },
  {
    id: 'guess-pink-woman',
    name: 'Guess Pink Woman',
    category: 'women',
    price: 64900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Perpaduan fruity floral dengan sentuhan pear, apple, peony, dan musk yang ceria serta feminin.',
    characters: ['Fresh', 'Feminine', 'Playful'],
    notes: {
      top: 'Pear, Apple',
      heart: 'Peony, Rose',
      base: 'Musk, Amber'
    }
  },
  {
    id: 'baccarat-rouge-540',
    name: 'Baccarat Rouge 540',
    category: 'women',
    price: 99900,
    image: 'assets/images/bottle.png',
    badge: 'Luxury',
    description: 'Aroma mewah dengan perpaduan saffron, amber, cedarwood, dan musk. Elegan, unik, dan sangat berkelas.',
    characters: ['Luxury', 'Sweet Woody', 'Signature'],
    notes: {
      top: 'Saffron, Jasmine',
      heart: 'Ambergris, Cedarwood',
      base: 'Fir Resin, Musk'
    }
  },
  {
    id: 'choco-chanel',
    name: 'Choco Chanel',
    category: 'women',
    price: 69900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Aroma cokelat manis berpadu vanilla, cocoa, dan musk yang lembut. Memberikan kesan hangat, nyaman, dan elegan.',
    characters: ['Sweet', 'Gourmand', 'Warm'],
    notes: {
      top: 'Cocoa, Coffee',
      heart: 'Chocolate, Vanilla',
      base: 'Musk, Caramel, Cream'
    }
  },
  {
    id: 'avril-lavigne',
    name: 'Avril Lavigne',
    category: 'women',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Perpaduan buah-buahan segar, floral, dan vanilla yang youthful serta feminin. Cocok digunakan untuk aktivitas santai maupun sehari-hari.',
    characters: ['Youthful', 'Sweet', 'Feminine'],
    notes: {
      top: 'Red Apple, Citrus',
      heart: 'Peony, Lily',
      base: 'Vanilla, Musk'
    }
  },
  {
    id: 'pink-chiffon',
    name: 'Pink Chiffon',
    category: 'women',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Vanilla, pear, dan floral lembut menciptakan aroma manis yang ringan dan feminin.',
    characters: ['Sweet', 'Girly'],
    notes: {
      top: 'Pear, Raspberry',
      heart: 'Peony, Lily of the Valley',
      base: 'Vanilla, Musk, Praline'
    }
  },

  // =================== MEN ===================
  {
    id: 'dunhill-blue',
    name: 'Dunhill Blue',
    category: 'men',
    price: 64900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Fresh aquatic dengan citrus dan musk yang elegan. Cocok digunakan saat bekerja maupun aktivitas sehari-hari.',
    characters: ['Professional', 'Fresh'],
    notes: {
      top: 'Citrus, Bergamot',
      heart: 'Aquatic, Lavender',
      base: 'Musk, Cedarwood'
    }
  },
  {
    id: 'bvlgari-aqva',
    name: 'Bvlgari Aqva',
    category: 'men',
    price: 69900,
    image: 'assets/images/bottle.png',
    badge: 'Popular',
    description: 'Nuansa laut yang segar dipadukan citrus dan mineral. Memberikan kesan bersih dan maskulin.',
    characters: ['Aquatic', 'Fresh', 'Clean'],
    notes: {
      top: 'Neroli, Citrus',
      heart: 'Seaweed, Aquatic',
      base: 'Mineral, Musk, Amber'
    }
  },
  {
    id: 'jaguar-blue',
    name: 'Jaguar Blue',
    category: 'men',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Fresh aquatic yang ringan dengan sentuhan citrus yang menyegarkan. Nyaman digunakan sepanjang hari.',
    characters: ['Daily', 'Clean'],
    notes: {
      top: 'Lemon, Grapefruit',
      heart: 'Aquatic, Green Notes',
      base: 'Musk, White Wood'
    }
  },
  {
    id: 'creed-aventus',
    name: 'Creed Aventus',
    category: 'men',
    price: 99900,
    image: 'assets/images/bottle.png',
    badge: 'Luxury',
    description: 'Perpaduan nanas, blackcurrant, birch, dan musk yang memberikan kesan sukses, maskulin, dan penuh percaya diri.',
    characters: ['Luxury', 'Powerful', 'Gentleman'],
    notes: {
      top: 'Pineapple, Blackcurrant',
      heart: 'Birch, Patchouli',
      base: 'Musk, Oakmoss, Vanilla'
    }
  },
  {
    id: 'tom-ford-tobacco-vanille',
    name: 'Tom Ford Tobacco Vanille',
    category: 'men',
    price: 94900,
    image: 'assets/images/bottle.png',
    badge: 'Premium',
    description: 'Perpaduan tembakau, vanilla, kakao, dan rempah yang hangat. Memberikan kesan mewah, berkelas, dan berkarisma.',
    characters: ['Luxury', 'Warm', 'Sophisticated'],
    notes: {
      top: 'Tobacco Leaf, Spice',
      heart: 'Tonka Bean, Cocoa',
      base: 'Vanilla, Dried Fruits, Wood'
    }
  },
  {
    id: 'hms-man',
    name: 'HMS Man',
    category: 'men',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Perpaduan citrus, woody, dan musk dengan aroma maskulin yang ringan. Memberikan kesan percaya diri untuk aktivitas sehari-hari.',
    characters: ['Masculine', 'Fresh', 'Casual'],
    notes: {
      top: 'Citrus, Green Apple',
      heart: 'Woody, Lavender',
      base: 'Musk, Sandalwood'
    }
  },
  {
    id: 'versace-eros',
    name: 'Versace Eros',
    category: 'men',
    price: 79900,
    image: 'assets/images/bottle.png',
    badge: 'Best Seller',
    description: 'Mint, green apple, vanilla, dan tonka bean menciptakan aroma maskulin yang kuat dan menggoda.',
    characters: ['Sexy', 'Powerful', 'Night Out'],
    notes: {
      top: 'Mint, Green Apple, Lemon',
      heart: 'Tonka Bean, Geranium',
      base: 'Vanilla, Vetiver, Oakmoss'
    }
  },
  {
    id: 'hugo-boss-man',
    name: 'Hugo Boss Man',
    category: 'men',
    price: 74900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Perpaduan apel hijau, citrus, woody, dan musk yang segar dengan nuansa modern. Cocok untuk pria aktif dan percaya diri.',
    characters: ['Fresh', 'Modern', 'Masculine'],
    notes: {
      top: 'Green Apple, Citrus',
      heart: 'Cinnamon, Geranium',
      base: 'Woody, Musk, Sandalwood'
    }
  },
  {
    id: '212-man',
    name: '212 Man',
    category: 'men',
    price: 69900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Aroma spicy woody dengan sentuhan grapefruit dan sandalwood. Memberikan kesan modern dan maskulin.',
    characters: ['Urban', 'Masculine', 'Modern'],
    notes: {
      top: 'Grapefruit, Spices',
      heart: 'Sage, Gardenia',
      base: 'Sandalwood, Musk, Labdanum'
    }
  },

  // =================== UNISEX ===================
  {
    id: 'ck-one',
    name: 'CK One',
    category: 'unisex',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Aroma unisex yang bersih dengan perpaduan citrus, green tea, dan musk. Ringan dan nyaman dipakai setiap hari.',
    characters: ['Minimalist', 'Fresh', 'Everyday'],
    notes: {
      top: 'Bergamot, Lemon, Pineapple',
      heart: 'Green Tea, Violet, Rose',
      base: 'Musk, Amber, Cedar'
    }
  },
  {
    id: 'ck-be',
    name: 'CK Be',
    category: 'unisex',
    price: 59900,
    image: 'assets/images/bottle.png',
    badge: '',
    description: 'Aroma musk lembut berpadu lavender, mint, dan sandalwood yang bersih serta menenangkan. Cocok untuk pria maupun wanita.',
    characters: ['Soft', 'Clean', 'Unisex'],
    notes: {
      top: 'Bergamot, Mint, Lavender',
      heart: 'Juniper Berry, Peach',
      base: 'Sandalwood, Musk, Opoponax'
    }
  }
];

// Format price to Indonesian Rupiah
function formatPrice(price) {
  return 'Rp ' + price.toLocaleString('id-ID');
}

// Get product by ID
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

// Get products by category
function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}
