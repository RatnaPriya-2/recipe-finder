import React, { useEffect, useState } from "react";
import WatchVideo from "./WatchVideo";
import { Link, useNavigate } from "react-router-dom";

const RecipeCard = ({
  newRecipe,
  favoriteToLs,
  setFavoriteToLs,
  isFavorite,
  setIsFavorite,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleRecipeDetails = () => {
    navigate("/recipe-details", { state: newRecipe });
  };

  const handleWatchRecipe = () => {
    setVideoUrl(newRecipe.strYoutube);
    setIsOpen(!isOpen);
  };

  const handleFavorite = () => {
    setFavoriteToLs((prev) => {
      if (prev.some((recipe) => recipe.idMeal === newRecipe.idMeal)) {
        return prev;
      }

      const updatedFavorites = [...prev, newRecipe];
      localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <>
      <WatchVideo
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="card-body">
        <div className="card-img">
          <img src={newRecipe.strMealThumb} alt={newRecipe.strMeal} />
        </div>
        <div className="card-content">
          <div className="content-block">
            <div className="name-favorite-cluster flex">
              <p className="recipe-name">{newRecipe.strMeal}</p>
              <div className="fav-icon" onClick={handleFavorite}>
                <i
                  title="Add to favorites"
                  className={`fa-solid fa-heart ${isFavorite ? "pink" : ""}`}
                ></i>
              </div>
            </div>
            <p className="cuisine">
              <span>Cuisine</span>: {newRecipe.strArea}
            </p>
          </div>
          <div className="btn-cluster ">
            <button className="get-recipe" onClick={handleRecipeDetails}>
              {/* <Link to="/recipe-details">Get Recipe</Link> */}
              Get Recipe
            </button>

            <button onClick={handleWatchRecipe} className="watch-recipe">
              Watch Recipe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
