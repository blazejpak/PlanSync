import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
