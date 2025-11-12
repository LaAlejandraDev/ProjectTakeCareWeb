import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Forum from "./pages/Forum.jsx";
import ForumPost from "./pages/ForumPost.jsx";
import ForumAllPosts from "./pages/ForumAllPosts.jsx";
import Messages from "./pages/Messages.jsx";
import CreatePost from "./pages/ForumCreatePost.jsx";
import Chat from "./pages/Chat.jsx";
import PearsonList from "./components/Chat/PearsonList.jsx";
import Diary from "./pages/Diary.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expediente from "./pages/Expediente.jsx";
import Sesiones from "./pages/Sesiones.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Navigate to="/login" />,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/index",
    Component: App,
    children: [
      {
        path: "/index/forum",
        Component: Forum,
        children: [
          {
            path: "/index/forum/allpost",
            Component: ForumAllPosts,
          },
          {
            path: "/index/forum/post/:postId",
            Component: ForumPost,
          },
          {
            path: "/index/forum/post/create",
            Component: CreatePost,
          },
        ],
      },
      {
        path: "/index/messages",
        Component: Messages,
        children: [
          {
            path: "index/messages/list",
            Component: PearsonList,
          },
          {
            path: "/index/messages/chat",
            Component: Chat,
          },
        ],
      },
      {
        path: "/index/expediente",
        Component: Expediente,
      },
      {
        path: "/index/sesiones/:id",
        Component: Sesiones,
      },
      {
        path: "/index/diary",
        Component: Diary,
      },
      {
        path: "/index/profile",
        Component: EditProfile,
      },
      {
        path: "/index/Dashboard",
        Component: Dashboard,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
