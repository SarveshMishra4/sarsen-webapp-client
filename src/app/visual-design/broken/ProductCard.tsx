import { Product } from "./data";
import { log } from "./logger";

interface Props {
  product: Product;
  onSelect: (p: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
}: Props) {

  const handleClick = () => {
    log("ProductCard", "Clicked", product.name);

    onSelect(product);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-5 rounded shadow cursor-pointer hover:shadow-lg"
    >
      <h3 className="font-semibold">
        {product.name}
      </h3>

      <p className="text-sm text-gray-500">
        {product.price}
      </p>
    </div>
  );
}