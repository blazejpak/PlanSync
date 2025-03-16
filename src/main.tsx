import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./routes/Home/Home";
import SignIn from "./routes/Signin/SignIn";
import SignUp from "./routes/SignUp/SignUp";
import Root from "./routes/Root";

import "./main.scss";
import ProtectedRoute from "./routes/ProtectedRoute";
import BoardWrapper from "./routes/Board/BoardWrapper";
import MobileCalendar from "./routes/Board/mobile/calendar/MobileCalendar";
import Board from "./routes/Board/Board";
import ErrorBoundary from "./routes/ErrorBoundary";
import NewMessage from "./routes/Board/mobile/message/NewMessage";
import Conversation from "./routes/Board/mobile/message/conversation/Conversation";
import Conversations from "./routes/Board/mobile/message/Conversations";
import ConversationLoader from "./routes/Board/mobile/message/ConversationLoader";
import Overlay from "./components/modals/Overlay";
import EditTask from "./components/modals/EditTask/EditTask";
import DeleteTask from "./components/modals/DeleteTask/DeleteTask";
import ShowTask from "./components/modals/ShowTask/ShowTask";
import Settings from "./components/modals/Settings/Settings";
import AddTask from "./components/modals/AddTask/AddTask";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorBoundary />,
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
        path: "/board/:boardId",
        element: (
          <ProtectedRoute>
            <BoardWrapper />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "add-task",
            element: <AddTask />,
          },
          {
            path: "t/:taskId",

            children: [
              {
                path: "",
                element: (
                  <>
                    <Board />
                    <Overlay>
                      <ShowTask />
                    </Overlay>
                  </>
                ),
              },
              {
                path: "edit-task",
                element: (
                  <Overlay>
                    <EditTask />
                  </Overlay>
                ),
              },
              {
                path: "delete-task",
                element: (
                  <Overlay>
                    <DeleteTask />
                  </Overlay>
                ),
              },
            ],
          },
          {
            path: "calendar",
            element: <MobileCalendar />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "messages/:userId",
        element: <Conversations />,
        loader: ConversationLoader,
      },
      { path: "messages/:userId/new-message", element: <NewMessage /> },
      { path: "messages/:userId/:conversationId", element: <Conversation /> },
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
