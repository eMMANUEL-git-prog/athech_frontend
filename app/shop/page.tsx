"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Pro Running Shoes Elite",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    category: "Footwear",
    brand: "SpeedMax",
    inStock: true,
    featured: true,
    tags: ["running", "lightweight", "breathable"],
  },
  {
    id: 2,
    name: "Performance Training Shorts",
    price: 39.99,
    rating: 4.6,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
    category: "Apparel",
    brand: "AthleticFit",
    inStock: true,
    featured: false,
    tags: ["training", "moisture-wicking", "flexible"],
  },
  {
    id: 3,
    name: "Smart Fitness Watch Pro",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviews: 528,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Electronics",
    brand: "TechSport",
    inStock: true,
    featured: true,
    tags: ["smartwatch", "heart-rate", "gps"],
  },
  {
    id: 4,
    name: "Compression Recovery Tights",
    price: 59.99,
    rating: 4.7,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    category: "Apparel",
    brand: "RecoverFast",
    inStock: true,
    featured: false,
    tags: ["recovery", "compression", "support"],
  },
  {
    id: 5,
    name: "Wireless Sport Earbuds",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
    category: "Electronics",
    brand: "SoundFit",
    inStock: true,
    featured: true,
    tags: ["wireless", "waterproof", "noise-cancelling"],
  },
  {
    id: 6,
    name: "Premium Yoga Mat",
    price: 49.99,
    rating: 4.8,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400",
    category: "Equipment",
    brand: "ZenFit",
    inStock: true,
    featured: false,
    tags: ["yoga", "non-slip", "eco-friendly"],
  },
  {
    id: 7,
    name: "Protein Shaker Bottle",
    price: 19.99,
    rating: 4.6,
    reviews: 276,
    image: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400",
    category: "Accessories",
    brand: "ShakePro",
    inStock: true,
    featured: false,
    tags: ["hydration", "leak-proof", "bpa-free"],
  },
  {
    id: 8,
    name: "Adjustable Dumbbells Set",
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviews: 367,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    category: "Equipment",
    brand: "PowerLift",
    inStock: true,
    featured: true,
    tags: ["strength", "adjustable", "home-gym"],
  },
  {
    id: 9,
    name: "Moisture-Wicking Athletic Shirt",
    price: 34.99,
    rating: 4.7,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    category: "Apparel",
    brand: "AthleticFit",
    inStock: true,
    featured: false,
    tags: ["breathable", "quick-dry", "anti-odor"],
  },
  {
    id: 10,
    name: "Resistance Bands Set",
    price: 29.99,
    rating: 4.6,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400",
    category: "Equipment",
    brand: "FlexFit",
    inStock: false,
    featured: false,
    tags: ["resistance", "portable", "versatile"],
  },
  {
    id: 11,
    name: "Sports Sunglasses UV400",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400",
    category: "Accessories",
    brand: "VisionSport",
    inStock: true,
    featured: true,
    tags: ["uv-protection", "polarized", "lightweight"],
  },
  {
    id: 12,
    name: "Foam Roller Pro",
    price: 39.99,
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400",
    category: "Equipment",
    brand: "RecoverFast",
    inStock: true,
    featured: false,
    tags: ["recovery", "muscle-relief", "durable"],
  },
];

const categories = [
  "All",
  "Footwear",
  "Apparel",
  "Electronics",
  "Equipment",
  "Accessories",
];
const brands = [
  "All",
  "SpeedMax",
  "AthleticFit",
  "TechSport",
  "RecoverFast",
  "SoundFit",
  "ZenFit",
  "ShakePro",
  "PowerLift",
  "FlexFit",
  "VisionSport",
];
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesBrand =
        selectedBrand === "All" || product.brand === selectedBrand;
      const matchesPrice =
        product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    selectedPriceRange,
    sortBy,
  ]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
              {showFilters && <X className="w-4 h-4" />}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-green-600 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-600" />
                  Brand
                </h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === brand}
                        onChange={() => setSelectedBrand(brand)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-green-600 transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  Price Range
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange.label === range.label}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-green-600 transition-colors">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-700">
            <span className="font-semibold text-green-600">
              {filteredProducts.length}
            </span>{" "}
            products found
          </p>
          {cart.length > 0 && (
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
              <ShoppingCart className="w-4 h-4" />
              {cart.length} items in cart
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-6 bg-gray-100 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                      <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        SALE
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-2 rounded-lg backdrop-blur-md transition-all ${
                        favorites.includes(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(product.id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-md rounded-lg text-gray-700 hover:bg-green-500 hover:text-white transition-all">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-xs text-green-600 font-semibold mb-1">
                      {product.brand}
                    </p>
                    <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      Ksh. {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        Ksh. {product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={!product.inStock}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      product.inStock
                        ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
