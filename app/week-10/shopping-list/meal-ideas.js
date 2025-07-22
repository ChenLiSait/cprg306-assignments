"use client";
import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  const cleanedIngredient = encodeURIComponent(ingredient.trim().toLowerCase());
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${cleanedIngredient}`
  );
  const data = await response.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMealIdeas() {
      if (!ingredient) return;
      const meals = await fetchMealIdeas(ingredient);
      setMeals(meals);
    }

    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="p-4 w-full md:w-1/2">
      <h2 className="text-xl font-bold mb-3">Meal Ideas for: {ingredient}</h2>
      {meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="border rounded p-2">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-32 object-cover rounded mb-2" />
              <p className="font-medium">{meal.strMeal}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
