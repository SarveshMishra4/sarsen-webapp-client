"use client";

import { useEffect, useState } from "react";

/* =================================================
   TYPES
================================================= */

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

/* =================================================
   MOCK DATA
================================================= */

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Growth Strategy Kit",
    price: "₹80,000",
    description: "Complete growth roadmap",
  },
  {
    id: 2,
    name: "Market Intelligence Pack",
    price: "₹60,000",
    description: "Competitor & market analysis",
  },
];

/* =================================================
   PAGE
================================================= */

export default function SingleFileDemo() {
  /* =============================================
     STATE
  ============================================= */

  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  /* =============================================
     EFFECTS
  ============================================= */

  useEffect(() => {
    console.log("[SingleFile] Component Mounted");

    loadProducts();

    return () => {
      console.log("[SingleFile] Component Unmounted");
    };
  }, []);

  /* =============================================
     DATA LOADER
  ============================================= */

  const loadProducts = () => {
    console.log("[SingleFile] Loading Products...");

    // Simulate API
    setTimeout(() => {
      setProducts(PRODUCTS);

      console.log("[SingleFile] Products Loaded");
    }, 500);
  };

  /* =============================================
     HANDLERS
  ============================================= */

  const handleSelect = (product: Product) => {
    console.log("[SingleFile] Product Selected:", product.name);

    setSelected(product);
  };

  /* =============================================
     RENDER
  ============================================= */

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Single File Demo
      </h1>

      {/* Product List */}
      <div className="grid grid-cols-2 gap-4 mb-10">

        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="bg-white p-5 rounded shadow cursor-pointer hover:shadow-lg"
          >
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.price}</p>
          </div>
        ))}

      </div>

      {/* Details */}
      {selected && (
        <div className="bg-white p-6 rounded shadow ">

          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {selected.name}
          </h2>

          <p className="mb-2 text-gray-700">{selected.description}</p>

          <p className="font-semibold text-gray-800">
            Price: {selected.price}
          </p>

        </div>
      )}

    </div>
  );
}