import React from "react";
import ReactDOM from "react-dom/client";

import "./main.scss";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home/Home";
import SignIn from "./routes/Signin/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
