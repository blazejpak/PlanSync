import React from "react";
import ReactDOM from "react-dom/client";

import "./main.scss";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Board from "./routes/Board/Board";
import App from "./App";

// import Home from "./routes/Home/Home";
// import SignIn from "./routes/Signin/SignIn";
// import SignUp from "./routes/SignUp/SignUp";
// import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      // {
      //   path: "/",
      //   element: <Home />,
      // },
      // {
      //   path: "/sign-in",
      //   element: <SignIn />,
      // },
      // {
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
      { path: "/", element: <App /> },
      {
        path: "/board",
        element: <Board />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
