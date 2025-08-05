"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";
import { addItem, subscribeToItems } from "../_services/shopping-list-service";

export default function ShoppingListPage() {
  const { user } = useUserAuth();

  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const unsubscribe = subscribeToItems(user.uid, (list) => {
      setItems(list);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [user]);

  const handleAddItem = async (newItem) => {
    if (!user) return;
    try {
      const id = await addItem(user.uid, newItem);
      console.log("Added to Firestore, id:", id);
    } catch (e) {
      console.error("addItem failed:", e);
      alert("Add failed: " + e.message);
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
        <h2 className="text-xl text-red-600 font-semibold">
          You must be logged in to view this page.
        </h2>
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
          {loading ? (
            <div className="text-gray-500 mt-4">Loading items…</div>
          ) : (
            <ItemList items={items} onItemSelect={handleItemSelect} />
          )}
        </div>

        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
