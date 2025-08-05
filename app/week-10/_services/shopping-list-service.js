// week-10/_services/shopping-list-service.js
import { db } from "../_utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
} from "firebase/firestore";

export async function getItems(userId) {
  if (!userId) throw new Error("getItems: missing userId");

  const itemsCol = collection(db, "users", userId, "items");
  const q = query(itemsCol);

  const snapshot = await getDocs(q);
  const items = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  return items;
}

export async function addItem(userId, item) {
  if (!userId) throw new Error("addItem: missing userId");
  if (!item || typeof item !== "object") {
    throw new Error("addItem: invalid item");
  }

  const { name, quantity, category } = item;
  if (typeof name !== "string" || name.trim().length < 1 || name.length > 50) {
    throw new Error("addItem: invalid name");
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
    throw new Error("addItem: invalid quantity");
  }
  if (typeof category !== "string" || category.length < 1) {
    throw new Error("addItem: invalid category");
  }

  const itemsCol = collection(db, "users", userId, "items");
  const ref = await addDoc(itemsCol, {
    name: name.trim(),
    quantity,
    category,
  });

  return ref.id;
}

export async function deleteItem(userId, itemId) {
  if (!userId) throw new Error("deleteItem: missing userId");
  if (!itemId) throw new Error("deleteItem: missing itemId");

  const itemRef = doc(db, "users", userId, "items", itemId);
  await deleteDoc(itemRef);
}
