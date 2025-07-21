"use client";
import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  // 排序副本数据，避免原地修改
  const sortedItems = [...itemsData].sort((a, b) =>
    a[sortBy].localeCompare(b[sortBy])
  );

  return (
    <div className="p-4">
      {/* 排序按钮 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setSortBy("name")}
          className={`px-3 py-1 rounded ${
            sortBy === "name" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-3 py-1 rounded ${
            sortBy === "category" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Sort by Category
        </button>
      </div>

      {/* 渲染排序后的 items */}
      {sortedItems.map((item) => (
        <Item
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          category={item.category}
        />
      ))}
    </div>
  );
}
