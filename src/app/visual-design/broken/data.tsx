export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
}

export const PRODUCTS: Product[] = [
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