"use client";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
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
      id: Math.random().toString(36).substring(2, 10), // 简单随机 ID
      name,
      quantity,
      category,
    };

    onAddItem(item);

    // 重置表单
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6 max-w-md"
    >
      <div className="mb-3">
        <label className="block font-medium mb-1">Item Name</label>
        <input
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <label className="font-medium">Quantity</label>
        <button
          type="button"
          onClick={decrement}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span className="font-bold">{quantity}</span>
        <button
          type="button"
          onClick={increment}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
        <select
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="household">Household</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Item
      </button>
    </form>
  );
}
