import React from "react";

const recipes = () => {
  return (
    <>
      <div className="search-cluster">
        <label htmlFor="search">
          Search recipes by name, ingredient, or cuisine...
        </label>
        <div className="search-block">
          <input type="text" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </>
  );
};

export default recipes;
