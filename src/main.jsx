import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Forum from "./pages/Forum.jsx";
import ForumPost from "./pages/ForumPost.jsx";
import ForumAllPosts from "./pages/ForumAllPosts.jsx";
import Messages from "./pages/Messages.jsx";
import CreatePost from "./pages/ForumCreatePost.jsx";
import Chat from "./pages/Chat.jsx";
import PearsonList from "./components/Chat/PearsonList.jsx";
import SubscriptionsPage from "./pages/Subscriptions.jsx";
import { SignalProvider } from "./context/SignalContext.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
<<<<<<< HEAD
import Users from "./pages/admin/Users.jsx";
import Suscriptions from "./pages/admin/Subscriptions.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
=======
import { AuthProvider } from "./context/AuthContext.jsx";
import NotFoundPage from "./pages/NotFound.jsx";
import RoutesProtect from "./context/RoutesProtect.jsx";
>>>>>>> 6c3e5922ca95b52b50f58be8a128ec2820bd9d7f

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <NotFoundPage />,
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/subscriptions", element: <SubscriptionsPage /> },
  {
    element: <RoutesProtect />,
    children: [
      {
        path: "/index",
        element: <App />,
        children: [
          { index: true, element: <Navigate to="forum" replace /> },
          {
            path: "forum",
            element: <Forum />,
            children: [
              { index: true, element: <ForumAllPosts /> },
              { path: "allpost", element: <ForumAllPosts /> },
              { path: "post/:postId", element: <ForumPost /> },
              { path: "post/create", element: <CreatePost /> },
            ],
          },
          {
            path: "messages",
            element: <Messages />,
            children: [
              { index: true, element: <PearsonList /> },
              { path: "list", element: <PearsonList /> },
              { path: "chat/:id", element: <Chat /> },
            ],
          },
          { path: "diary", element: <h1>Diario</h1> },
          { path: "profile", element: <h1>Perfil</h1> },
        ],
      },
    ],
  },
<<<<<<< HEAD
  {
    path: "/admin",
    element: <App />,
    children: [
      { path: "users", element: <Users /> },
      { path: "subscriptions", element: <Suscriptions /> },
      { path: "dash", element: <Dashboard /> },
    ],
  },
=======
  { path: "*", element: <NotFoundPage /> },
>>>>>>> 6c3e5922ca95b52b50f58be8a128ec2820bd9d7f
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SignalProvider>
        <RouterProvider router={router} />
      </SignalProvider>
    </AuthProvider>
  </StrictMode>
);
