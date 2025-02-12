import React from "react";
import RecipeCard from "./RecipeCard";

const Favorites = () => {
  const getFavorites = JSON.parse(localStorage.getItem("favorite")) || [];

  return (
    <>
      <div className="favorites-main-body">
        {getFavorites.map((recipe, index) => (
          <RecipeCard key={index} newRecipe={recipe} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
