"use client";
import { useState } from "react";

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < 20) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center gap-2 mt-10 ml-10">
      <span className="text-lg font-semibold">{quantity}</span>
      <button
        className="px-3 py-1 rounded bg-gray-400 text-white disabled:opacity-50"
        onClick={decrement}
        disabled={quantity === 1}
      >
        -
      </button>
      <button
        className="px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
        onClick={increment}
        disabled={quantity === 20}
      >
        +
      </button>
    </div>
  );
}
