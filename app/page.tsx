
"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    rating: "4.8",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Classic Sneakers",
    category: "Fashion",
    price: 1999,
    oldPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    rating: "4.6",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 3299,
    oldPrice: 4999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    rating: "4.9",
    badge: "Trending",
  },
  {
    id: 4,
    name: "Women's Handbag",
    category: "Accessories",
    price: 1599,
    oldPrice: 2499,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    rating: "4.7",
    badge: "New",
  },
  {
    id: 5,
    name: "Sunglasses",
    category: "Accessories",
    price: 899,
    oldPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    rating: "4.5",
    badge: "Sale",
  },
  {
    id: 6,
    name: "Modern Backpack",
    category: "Fashion",
    price: 1299,
    oldPrice: 1999,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    rating: "4.6",
    badge: "Popular",
  },
];

const categories = [
  { name: "Electronics", icon: "🎧" },
  { name: "Fashion", icon: "👟" },
  { name: "Accessories", icon: "👜" },
  { name: "Beauty", icon: "💄" },
];

export default function Home() {
  const [cart, setCart] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (id: number) => {
    setCart((current) => [...current, id]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="#" className="text-2xl font-extrabold text-indigo-600">
            ShopEase<span className="text-orange-500">.</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#" className="text-indigo-600">Home</a>
            <a href="#products" className="hover:text-indigo-600">
              Products
            </a>
            <a href="#categories" className="hover:text-indigo-600">
              Categories
            </a>
            <a href="#footer" className="hover:text-indigo-600">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="hidden w-44 rounded-full border px-4 py-2 text-sm outline-none focus:border-indigo-500 sm:block"
            />

            <button
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="relative rounded-full bg-indigo-50 px-4 py-2 font-semibold text-indigo-700"
            >
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-indigo-950 px-5 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider">
              New Season Collection
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl">
              Discover Your
              <span className="block text-orange-400">
                Perfect Style.
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-indigo-100">
              Explore amazing products, discover new trends and enjoy
              shopping with ShopEase. Great products, great prices!
            </p>

            <a
              href="#products"
              className="mt-8 inline-block rounded-full bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600"
            >
              Shop Now →
            </a>

            <div className="mt-10 flex gap-8">
              <div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-sm text-indigo-200">Products</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-sm text-indigo-200">Customers</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">4.9★</h3>
                <p className="text-sm text-indigo-200">Rating</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
              alt="Modern fashion shopping store"
              width={1000}
              height={700}
              unoptimized
              className="h-80 w-full rounded-3xl object-cover shadow-2xl md:h-105"
            />
            <div className="absolute -bottom-5 -left-3 rounded-2xl bg-white p-5 text-gray-900 shadow-xl md:-left-8">
              <p className="text-sm text-gray-500">Special Offer</p>
              <p className="text-2xl font-extrabold text-orange-500">
                Up to 40% OFF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 text-center">
          <p className="font-bold uppercase tracking-widest text-indigo-600">
            Browse Collections
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setCategory(item.name);
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="rounded-2xl border bg-white p-7 text-center transition hover:-translate-y-1 hover:border-indigo-400 hover:shadow-lg"
            >
              <span className="text-5xl">{item.icon}</span>
              <h3 className="mt-4 font-bold">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Explore Now →</p>
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-white px-5 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-bold uppercase tracking-widest text-indigo-600">
                Our Collection
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Featured Products
              </h2>
            </div>

            <button
              onClick={() => setCategory("All")}
              className="rounded-full border px-5 py-2 text-sm font-semibold hover:bg-indigo-50"
            >
              View All Products
            </button>
          </div>

          <div className="mb-7 flex flex-wrap gap-3">
            {["All", "Electronics", "Fashion", "Accessories"].map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={450}
                    unoptimized
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                    {product.badge}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-sm text-indigo-600">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-yellow-500">
                    ★★★★★ <span className="text-gray-500">{product.rating}</span>
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-extrabold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        ₹{product.oldPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(product.id)}
                    className="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white transition hover:bg-indigo-700"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="py-12 text-center text-gray-500">
              No products found. Try another search.
            </p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-orange-50 px-5 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold">
            Get 10% Off Your First Order!
          </h2>
          <p className="mt-3 text-gray-600">
            Subscribe to receive updates about new products and special offers.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
            className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 rounded-full border bg-white px-6 py-4 outline-none focus:border-orange-500"
            />
            <button className="rounded-full bg-orange-500 px-8 py-4 font-bold text-white hover:bg-orange-600">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-indigo-950 px-5 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-extrabold">
              ShopEase<span className="text-orange-400">.</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-indigo-200">
              Your one-stop destination for fashion, electronics and
              everyday lifestyle products.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-indigo-200">
              <a href="#" className="hover:text-white">Home</a>
              <a href="#products" className="hover:text-white">Products</a>
              <a href="#categories" className="hover:text-white">Categories</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Contact Us</h3>
            <p className="mt-4 text-sm text-indigo-200">
              Email: support@shopease.com
            </p>
            <p className="mt-2 text-sm text-indigo-200">
              Customer Support: Available online
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-7xl border-t border-indigo-800 pt-6 text-center text-sm text-indigo-300">
          © 2026 ShopEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
