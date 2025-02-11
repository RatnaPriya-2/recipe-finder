import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import About from "./components/About";
import Hero from "./components/Hero";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App as the wrapper
    children: [
      {
        path: "/", // Home Page
        element: <Hero />,
      },
      {
        path: "/about", // About Page
        element: <About />,
      },
      {
        path: "/recipes", // About Page
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
