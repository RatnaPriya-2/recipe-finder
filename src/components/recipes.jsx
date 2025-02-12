import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const [inputQuery, setInputQuery] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [allMeals, setAllMeals] = useState([]);

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
  // console.log(JSON.stringify(allMeals,null,2));

  let filteredMealsByName = allMeals.filter(
    (meal) =>
      meal &&
      meal.strMeal.toLowerCase().includes(inputQuery.trim().toLowerCase())
  );
  let filteredMealsByCuisine = allMeals.filter(
    (meal) =>
      meal &&
      meal.strArea.toLowerCase().includes(inputQuery.trim().toLowerCase())
  );

  if (!allMeals) {
    return (
      <div className="recipes-main-body">
        <div className="search-cluster">
          <p>Search recipes by name, ingredient, or cuisine...</p>
          <div className="search-block">
            <input
              type="text"
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Search for recipes..."
              autoComplete="off"
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <p className="error-message">
          No recipes found. Try a different search!
        </p>
      </div>
    );
  }

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
          {(filteredMealsByCuisine.length > 0
            ? filteredMealsByCuisine
            : filteredMealsByName
          ).map((recipe, index) => {
            return (
              <RecipeCard
                key={index}
                newRecipe={recipe}
                favorite={favorite}
                setFavorite={setFavorite}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Recipes;
