import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home/Home";
import SignIn from "./routes/Signin/SignIn";
import SignUp from "./routes/SignUp/SignUp";
import Root from "./routes/Root";
import Board from "./routes/Board/Board";

import "./main.scss";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/board",
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
