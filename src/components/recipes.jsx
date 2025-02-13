import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [favoriteToLs, setFavoriteToLs] = useState(
    JSON.parse(localStorage.getItem("favoriteToLs")) || []
  );
  const [allMeals, setAllMeals] = useState([]);
  const [basicMeals, setBasicMeals] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputQuery}`;
      let response = await fetch(url);
      let data = await response.json();
      setBasicMeals(data.meals);
    };
    getInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let str = "abcdefghijklmnopqrstuvwxyz";
      let dataList = await Promise.all(
        str.split("").map(async (char) => {
          let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`;
          let response = await fetch(url);
          let data = await response.json();
          let mealList = data.meals;
          return mealList || [];
        })
      );
      let finalData = dataList.flat(); //dataList is nested array
      setAllMeals(finalData);
    };
    fetchData();
  }, []);

  const handleFavoriteToggle = (recipe) => {
    setFavoriteToLs((prev) => {
      const isFavorite = prev.some((fav) => fav.idMeal === recipe.idMeal);

      const updatedFavorites = isFavorite
        ? prev.filter((fav) => fav.idMeal !== recipe.idMeal)
        : [...prev, recipe];

      localStorage.setItem("favoriteToLs", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  const isFavorite = (recipe) =>
    favoriteToLs.some((fav) => fav.idMeal === recipe.idMeal);

  let filteredMealsByName =
    allMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(inputQuery.trim().toLowerCase())
    ) || [];
  let filteredMealsByCuisine =
    allMeals.filter((meal) =>
      meal.strArea.toLowerCase().includes(inputQuery.trim().toLowerCase())
    ) || [];

  return (
    <>
      <div className="recipes-main-body">
        <div className="search-cluster">
          <p>Search recipes by name, ingredient, or cuisine...</p>
          <div className="search-block">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for recipes..."
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="recipe-container">
          {inputQuery !== "" &&
          filteredMealsByCuisine.length === 0 &&
          filteredMealsByName.length === 0 ? (
            <p>No recipes found ...</p>
          ) : (
            (inputQuery === ""
              ? basicMeals
              : filteredMealsByCuisine.length > 0
              ? filteredMealsByCuisine
              : filteredMealsByName
            )?.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                newRecipe={recipe}
                isFavorite={isFavorite(recipe)}
                onToggleFavorite={() => handleFavoriteToggle(recipe)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Recipes;
