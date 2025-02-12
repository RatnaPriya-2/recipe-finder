import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import { useState } from "react";

function App() {
  

  return (
    <>
      <div className="main-container">
        <Nav />
        <Outlet />
      </div>
    </>
  );
}

export default App;
