import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="main-body">
        <div className="content">
          <p className="content-text">
            Master the kitchen with ease.
            <br />
            <span>
              Discover recipes helping you to find the easiest way to cook
            </span>
          </p>

          <Link to="/recipes">
            <span>Browse Recipes</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hero;
