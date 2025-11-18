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
import Expediente from "./pages/Expediente.jsx";
import Sesiones from "./pages/Sesiones.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Diary from "./pages/Diary.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import PacientesDiario from "./pages/PacientesDiario.jsx";
import Diariopaciente from "./pages/Diariopaciente.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/subscriptions",
    element: <SubscriptionsPage />,
  },
  {
    path: "/index",
    element: <App />,
    children: [
      {
        path: "forum",
        element: <Forum />,
        children: [
          { path: "allpost", element: <ForumAllPosts /> },
          { path: "post/:postId", element: <ForumPost /> },
          { path: "post/create", element: <CreatePost /> },
        ],
      },
      {
        path: "messages",
        element: <Messages />,
        children: [
          { path: "list", element: <PearsonList /> },
          { path: "chat", element: <Chat /> },
        ],
      },
      { path: "diary", element: <PacientesDiario /> },
      {
        path: "diario/paciente/:id",
        element: <Diariopaciente />,
      },
      { path: "profile", element: <EditProfile /> },

      {
        path: "record",
        element: <Expediente />,
      },
      {
        path: "session/:id",
        element: <Sesiones />,
      },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SignalProvider>
      <RouterProvider router={router} />
    </SignalProvider>
  </StrictMode>
);
