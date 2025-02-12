import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const location = useLocation();
  const newRecipe = location.state || [];
  const navigate = useNavigate();

  let finalIngredients = Object.keys(newRecipe)
    .filter((x) => x.includes("strIngredient") && newRecipe[x]?.trim())
    .map((x) => newRecipe[x]);

  let finalMeasurements = Object.keys(newRecipe)
    .filter((x) => x.includes("strMeasure") && newRecipe[x]?.trim())
    .map((x) => newRecipe[x]);

  return (
    <div className="recipe-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <i class="fa-solid fa-arrow-left-long"></i> Back
      </button>
      <p className="recipe-details-title">{newRecipe.strMeal}</p>

      <div className="recipe-details-image">
        <img src={newRecipe.strMealThumb} alt={newRecipe.strMeal} />
      </div>

      <div className="ingredients">
        <p className="section-title">Ingredients</p>
        <ul className="ingredients-list">
          {finalIngredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient} - {finalMeasurements[index]}
            </li>
          ))}
        </ul>
      </div>

      <div className="instructions">
        <p className="section-title">Instructions</p>
        <ol className="instructions-list">
          {newRecipe.strInstructions
            .replace(/STEP \d+ [A-Z\s]*?:?/g, "") // Remove "STEP X ..." text
            .trim()
            .split(/\.\s*|\n+/) // Split at period+space or newlines
            .filter((sentence) => sentence.trim() !== "") // Remove empty strings
            .map((sentence, index) => (
              <li key={index}>{sentence.trim() + "."}</li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetails;
