import { useEffect, useState } from "react";
import { PRODUCTS, Product } from "./data";
import { log } from "./logger";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    log("useProducts", "Hook Mounted");

    load();

    return () => {
      log("useProducts", "Hook Unmounted");
    };
  }, []);

  const load = () => {
    log("useProducts", "Loading Products");

    setTimeout(() => {
      setProducts(PRODUCTS);

      log("useProducts", "Products Loaded");
    }, 500);
  };

  return { products };
}