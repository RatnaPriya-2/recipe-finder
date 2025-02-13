import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const Favorites = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem("favoriteToLs")) || []
  );
  useEffect(() => {
    localStorage.setItem("favoriteToLs", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavoriteToggle = (recipe) => {
    setFavoriteRecipes((prevFavorites) =>
      prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal)
    );
  };

  return (
    <>
      <div className="favorites-main-body">
        {favoriteRecipes.length > 0 ? (
          favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              newRecipe={recipe}
              isFavorite={true}
              onToggleFavorite={() => handleFavoriteToggle(recipe)}
            />
          ))
        ) : (
          <p>No favorite recipes found</p>
        )}
      </div>
    </>
  );
};

export default Favorites;
