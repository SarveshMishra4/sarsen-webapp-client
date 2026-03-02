"use client";

import { useState } from "react";

import { Product } from "./data";
import { useProducts } from "./useProducts";
import ProductCard from "./ProductCard";
import { log } from "./logger";

export default function ModularDemo() {

  log("Page", "Rendered");

  const { products } = useProducts();

  const [selected, setSelected] =
    useState<Product | null>(null);

  const handleSelect = (product: Product) => {
    log("Page", "Product Selected", product.name);

    setSelected(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        Modular Demo
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 mb-10">

        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            onSelect={handleSelect}
          />
        ))}

      </div>

      {/* Details */}
      {selected && (
        <div className="bg-white p-6 rounded shadow">

          <h2 className="text-xl font-bold mb-2">
            {selected.name}
          </h2>

          <p className="mb-2">
            {selected.description}
          </p>

          <p className="font-semibold">
            Price: {selected.price}
          </p>

        </div>
      )}

    </div>
  );
}