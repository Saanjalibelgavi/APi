// All Products Data for Loom&Key Store
import { productImages } from "./productImages";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  categoryId: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
}

// Hot Beveled Products (Coffee, Tea, Beverages)
const hotBeveledProducts: Product[] = [
  {
    id: 101,
    name: "Artisan Coffee Blend",
    price: 899,
    originalPrice: 1199,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[0],
    description: "Premium single-origin coffee beans with rich, complex flavors. Hand-roasted to perfection for a smooth, aromatic experience.",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true
  },
  {
    id: 102,
    name: "Chamomile Evening Tea",
    price: 649,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[1],
    description: "Soothing organic chamomile tea with calming properties. Perfect for relaxation and peaceful evenings.",
    rating: 4.6,
    reviews: 89,
    inStock: true
  },
  {
    id: 103,
    name: "Matcha Green Tea Powder",
    price: 1299,
    originalPrice: 1599,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[2],
    description: "Premium ceremonial grade matcha from Japan. Rich in antioxidants and perfect for traditional tea ceremonies or lattes.",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    featured: true
  },
  {
    id: 104,
    name: "French Press Coffee Maker",
    price: 1899,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[3],
    description: "Elegant borosilicate glass French press with stainless steel frame. Brews perfect coffee every time.",
    rating: 4.7,
    reviews: 203,
    inStock: true
  },
  {
    id: 105,
    name: "Earl Grey Tea Collection",
    price: 749,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[4],
    description: "Classic Earl Grey with bergamot oil. A sophisticated blend for discerning tea lovers.",
    rating: 4.5,
    reviews: 78,
    inStock: true
  },
  {
    id: 106,
    name: "Ceramic Coffee Dripper",
    price: 1199,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[5],
    description: "Handcrafted ceramic pour-over coffee dripper. Creates a smooth, clean cup with precise extraction.",
    rating: 4.8,
    reviews: 142,
    inStock: true
  },
  {
    id: 107,
    name: "Herbal Tea Sampler Set",
    price: 1499,
    originalPrice: 1899,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[6],
    description: "Collection of 12 premium herbal teas including peppermint, lavender, and rooibos. Perfect gift set.",
    rating: 4.7,
    reviews: 167,
    inStock: true
  },
  {
    id: 108,
    name: "Cold Brew Coffee Kit",
    price: 2299,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[7],
    description: "Complete cold brew system with glass carafe and reusable filter. Makes smooth, low-acid coffee.",
    rating: 4.6,
    reviews: 91,
    inStock: true
  },
  {
    id: 109,
    name: "Organic Chai Spice Blend",
    price: 799,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[8],
    description: "Authentic Indian chai with cardamom, cinnamon, ginger, and cloves. Aromatic and warming.",
    rating: 4.9,
    reviews: 218,
    inStock: true,
    featured: true
  },
  {
    id: 110,
    name: "Espresso Roast Beans",
    price: 1099,
    category: "Hot Beveled",
    categoryId: "hot-beveled",
    image: productImages.hotBeveled[9],
    description: "Dark roasted espresso beans with bold flavor and crema. Perfect for espresso machines.",
    rating: 4.7,
    reviews: 134,
    inStock: true
  }
];

// Body Goods Products (Skincare, Beauty, Wellness)
const bodyGoodsProducts: Product[] = [
  {
    id: 201,
    name: "Lavender Body Butter",
    price: 1299,
    originalPrice: 1699,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[0],
    description: "Luxurious whipped body butter infused with organic lavender oil. Deeply moisturizes and soothes skin.",
    rating: 4.9,
    reviews: 287,
    inStock: true,
    featured: true
  },
  {
    id: 202,
    name: "Vitamin C Serum",
    price: 1899,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[1],
    description: "Brightening vitamin C serum with hyaluronic acid. Reduces dark spots and evens skin tone.",
    rating: 4.8,
    reviews: 342,
    inStock: true,
    featured: true
  },
  {
    id: 203,
    name: "Rose Water Toner",
    price: 899,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[2],
    description: "Pure rose water toner that refreshes and balances skin pH. Suitable for all skin types.",
    rating: 4.7,
    reviews: 198,
    inStock: true
  },
  {
    id: 204,
    name: "Coconut Oil Hair Mask",
    price: 1199,
    originalPrice: 1499,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[3],
    description: "Deep conditioning hair mask with virgin coconut oil. Repairs damaged hair and adds shine.",
    rating: 4.6,
    reviews: 156,
    inStock: true
  },
  {
    id: 205,
    name: "Charcoal Face Mask",
    price: 799,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[4],
    description: "Detoxifying charcoal face mask that draws out impurities and minimizes pores.",
    rating: 4.8,
    reviews: 223,
    inStock: true
  },
  {
    id: 206,
    name: "Shea Butter Hand Cream",
    price: 649,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[5],
    description: "Rich hand cream with shea butter and vitamin E. Non-greasy formula absorbs quickly.",
    rating: 4.7,
    reviews: 167,
    inStock: true
  },
  {
    id: 207,
    name: "Retinol Night Cream",
    price: 2299,
    originalPrice: 2899,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[6],
    description: "Anti-aging night cream with retinol and peptides. Reduces fine lines and improves texture.",
    rating: 4.9,
    reviews: 412,
    inStock: true,
    featured: true
  },
  {
    id: 208,
    name: "Aloe Vera Gel",
    price: 549,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[7],
    description: "99% pure aloe vera gel for soothing sunburns and hydrating skin naturally.",
    rating: 4.5,
    reviews: 134,
    inStock: true
  },
  {
    id: 209,
    name: "Argan Oil Treatment",
    price: 1599,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[8],
    description: "Pure Moroccan argan oil for hair and skin. Rich in vitamin E and fatty acids.",
    rating: 4.8,
    reviews: 289,
    inStock: true
  },
  {
    id: 210,
    name: "Exfoliating Body Scrub",
    price: 1099,
    category: "Body Goods",
    categoryId: "body-goods",
    image: productImages.bodyGoods[9],
    description: "Sugar and coffee body scrub that buffs away dead skin cells for smooth, glowing skin.",
    rating: 4.7,
    reviews: 201,
    inStock: true
  }
];

// Potted Plants Products (Indoor Plants, Succulents, Planters)
const pottedPlantsProducts: Product[] = [
  {
    id: 301,
    name: "Monstera Deliciosa",
    price: 1499,
    originalPrice: 1899,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[1 - 1],
    description: "Iconic Swiss cheese plant with stunning fenestrated leaves. Low-maintenance and air-purifying.",
    rating: 4.9,
    reviews: 178,
    inStock: true,
    featured: true
  },
  {
    id: 302,
    name: "Succulent Garden Set",
    price: 899,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[2 - 1],
    description: "Collection of 5 assorted succulents in ceramic pots. Perfect for desks and small spaces.",
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: 303,
    name: "Snake Plant",
    price: 799,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[3 - 1],
    description: "Hardy snake plant that thrives on neglect. Excellent air purifier for bedrooms.",
    rating: 4.8,
    reviews: 312,
    inStock: true,
    featured: true
  },
  {
    id: 304,
    name: "Fiddle Leaf Fig",
    price: 2499,
    originalPrice: 2999,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[4 - 1],
    description: "Statement fiddle leaf fig tree with large, violin-shaped leaves. Adds drama to any room.",
    rating: 4.6,
    reviews: 145,
    inStock: true
  },
  {
    id: 305,
    name: "Pothos Hanging Plant",
    price: 649,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[5 - 1],
    description: "Trailing pothos plant with heart-shaped leaves. Easy-care and fast-growing.",
    rating: 4.7,
    reviews: 267,
    inStock: true
  },
  {
    id: 306,
    name: "ZZ Plant",
    price: 1299,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[6 - 1],
    description: "Zamioculcas zamiifolia with glossy leaves. Tolerates low light and infrequent watering.",
    rating: 4.8,
    reviews: 189,
    inStock: true
  },
  {
    id: 307,
    name: "Peace Lily",
    price: 1099,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[7 - 1],
    description: "Elegant peace lily with white blooms. NASA-approved air purifier for homes.",
    rating: 4.9,
    reviews: 298,
    inStock: true,
    featured: true
  },
  {
    id: 308,
    name: "Cactus Collection",
    price: 749,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[8 - 1],
    description: "Set of 3 mini cacti in terracotta pots. Desert plants that require minimal care.",
    rating: 4.6,
    reviews: 156,
    inStock: true
  },
  {
    id: 309,
    name: "Rubber Plant",
    price: 1799,
    originalPrice: 2199,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[9 - 1],
    description: "Bold rubber plant with burgundy-tinted leaves. Air-purifying and low-maintenance.",
    rating: 4.7,
    reviews: 203,
    inStock: true
  },
  {
    id: 310,
    name: "Aloe Vera Plant",
    price: 549,
    category: "Potted Plants",
    categoryId: "potted-plants",
    image: productImages.pottedPlants[10 - 1],
    description: "Medicinal aloe vera plant in decorative pot. Gel-filled leaves great for skincare.",
    rating: 4.8,
    reviews: 334,
    inStock: true
  }
];

// Craft Ceramics Products (Pottery, Vases, Handmade)
const craftCeramicsProducts: Product[] = [
  {
    id: 401,
    name: "Handmade Ceramic Vase",
    price: 2299,
    originalPrice: 2799,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[1 - 1],
    description: "Artisan-crafted ceramic vase with organic shape. Each piece is unique with natural variations.",
    rating: 4.9,
    reviews: 167,
    inStock: true,
    featured: true
  },
  {
    id: 402,
    name: "Stoneware Bowl Set",
    price: 1899,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[2 - 1],
    description: "Set of 4 handcrafted stoneware bowls. Perfect for serving salads, soups, or pasta.",
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 403,
    name: "Terracotta Planter",
    price: 899,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[3 - 1],
    description: "Classic terracotta planter with drainage hole. Breathable clay perfect for herbs and plants.",
    rating: 4.7,
    reviews: 198,
    inStock: true
  },
  {
    id: 404,
    name: "Ceramic Coffee Mugs",
    price: 1299,
    originalPrice: 1599,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[4 - 1],
    description: "Pair of artisanal ceramic mugs with reactive glaze. Each mug holds 12 oz.",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    featured: true
  },
  {
    id: 405,
    name: "Decorative Plate Set",
    price: 2499,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[5 - 1],
    description: "Set of 6 handpainted ceramic plates. Food-safe and dishwasher-friendly.",
    rating: 4.6,
    reviews: 145,
    inStock: true
  },
  {
    id: 406,
    name: "Pottery Candle Holder",
    price: 749,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[6 - 1],
    description: "Minimalist ceramic candle holder with matte finish. Fits standard taper candles.",
    rating: 4.8,
    reviews: 189,
    inStock: true
  },
  {
    id: 407,
    name: "Ceramic Serving Platter",
    price: 1799,
    originalPrice: 2199,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[7 - 1],
    description: "Large oval serving platter with speckled glaze. Perfect for entertaining guests.",
    rating: 4.7,
    reviews: 178,
    inStock: true
  },
  {
    id: 408,
    name: "Handmade Tea Set",
    price: 3299,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[8 - 1],
    description: "Complete tea set including teapot and 4 cups. Traditional design with modern aesthetics.",
    rating: 4.9,
    reviews: 223,
    inStock: true,
    featured: true
  },
  {
    id: 409,
    name: "Ceramic Storage Jars",
    price: 1499,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[9 - 1],
    description: "Set of 3 airtight ceramic jars with wooden lids. Ideal for kitchen storage.",
    rating: 4.8,
    reviews: 267,
    inStock: true
  },
  {
    id: 410,
    name: "Artisan Fruit Bowl",
    price: 1899,
    category: "Craft Ceramics",
    categoryId: "craft-ceramics",
    image: productImages.craftCeramics[10 - 1],
    description: "Large handcrafted fruit bowl with unique glaze pattern. Statement piece for countertops.",
    rating: 4.7,
    reviews: 198,
    inStock: true
  }
];

// Combine all products
export const allProducts: Product[] = [
  ...hotBeveledProducts,
  ...bodyGoodsProducts,
  ...pottedPlantsProducts,
  ...craftCeramicsProducts
];

// Export products by category
export const productsByCategory = {
  "hot-beveled": hotBeveledProducts,
  "body-goods": bodyGoodsProducts,
  "potted-plants": pottedPlantsProducts,
  "craft-ceramics": craftCeramicsProducts
};

// Get products by category ID
export const getProductsByCategory = (categoryId: string): Product[] => {
  return productsByCategory[categoryId as keyof typeof productsByCategory] || [];
};

// Get featured products
export const getFeaturedProducts = (): Product[] => {
  return allProducts.filter(product => product.featured);
};

// Get product by ID
export const getProductById = (id: number): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

export default allProducts;




