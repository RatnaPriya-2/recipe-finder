import React from "react";

const CategoryCard = () => {
  if (newRecipe) {
    console.log(newRecipe);
  } else {
    console.log("newRecipe is undefined or null");
  }
  return (
    <>
      <div className="card-body">
        <div className="card-img">
          <img src={newRecipe.strCategoryThumb} alt={newRecipe.strCategory} />
        </div>
        <div className="card-content">
          <div className="content-block">
            <div className="name-favorite-cluster flex">
              <p className="recipe-name">{newRecipe.strCategory}</p>
              <div className="fav-icon">
                <i title="Add to favorites" className="fa-solid fa-heart"></i>
              </div>
            </div>
            {/* <p className="cuisine">
                    <span>Cuisine</span>: {newRecipe.strArea}
                  </p> */}
            <p className="cuisine">
              <span>{newRecipe.strCategoryDescription}</span>
            </p>
          </div>
          <div className="btn-cluster ">
            <button className="watch-recipe">Browse Recipes</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
