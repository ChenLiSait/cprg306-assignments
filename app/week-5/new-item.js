"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const increment = () => {
    if (quantity < 20) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const item = {
      name,
      quantity,
      category,
    };

    console.log(item);
    alert(`Added item:\n${name} (x${quantity}) in ${category}`);

    // Reset fields
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md space-y-4"
    >
      {/* Name Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Item Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter item name"
        />
      </div>

      {/* Quantity Control */}
      <div>
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            type="button"
            className="px-3 py-1 rounded bg-gray-400 text-white disabled:opacity-50"
            onClick={decrement}
            disabled={quantity === 1}
          >
            -
          </button>
          <button
            type="button"
            className="px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
            onClick={increment}
            disabled={quantity === 20}
          >
            +
          </button>
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
      >
        Add Item
      </button>
    </form>
  );
}
