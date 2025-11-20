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
import NotFoundPage from "./pages/NotFound.jsx";
import RoutesProtect from "./context/RoutesProtect.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import SchedulePage from "./pages/dashboard/SchedulePage.jsx";

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
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "schedule",
            element: <SchedulePage />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
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
