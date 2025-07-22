"use client";

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function ShoppingListPage() {
  const { user } = useUserAuth(); 

  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(",")[0]
      .replace(/[^\p{L}\s]/gu, "")
      .trim()
      .toLowerCase();
    setSelectedItemName(cleanedName);
  };

  if (!user) {
    return (
      <main className="p-6 text-center">
        <h2 className="text-xl text-red-600 font-semibold">You must be logged in to view this page.</h2>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shopping List with Meal Ideas</h1>
        <span className="text-gray-600">👤 {user.displayName}</span>
      </div>
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
