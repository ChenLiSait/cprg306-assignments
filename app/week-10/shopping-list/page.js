"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";

export default function ShoppingListPage() {
  const { user } = useUserAuth(); 

  const [items, setItems] = useState([]); // ✅ 初始为空数组
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    async function loadItems() {
      if (user) {
        const items = await getItems(user.uid);
        setItems(items);
      }
    }
    loadItems();
  }, [user]);

  const handleAddItem = async (newItem) => {
    if (user) {
      const id = await addItem(user.uid, newItem);
      setItems((prev) => [...prev, { id, ...newItem }]);
    }
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
