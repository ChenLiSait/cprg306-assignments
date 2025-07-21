"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const handleItemSelect = (item) => {
    // 去掉单位和 emoji，只提取食材名
    const cleanedName = item.name
      .split(",")[0]
      .replace(/[^\p{L}\s]/gu, "") // 去 emoji
      .trim()
      .toLowerCase();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping List with Meal Ideas</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
