import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Forum from './pages/Forum.jsx';
import ForumPost from './pages/ForumPost.jsx';
import ForumAllPosts from './pages/ForumAllPosts.jsx';
import Messages from './pages/Messages.jsx';
import CreatePost from './pages/ForumCreatePost.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <Navigate to="/login" />
  },
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/register",
    Component: Register
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
            Component: ForumAllPosts
          },
          {
            path: "/index/forum/post/:postId",
            Component: ForumPost
          },
          {
            path: "/index/forum/post/create",
            Component: CreatePost
          }
        ]
      },
      {
        path: "/index/messages",
        Component: Messages
      },
      {
        path: "/index/diary",
        Component: () => <h1>Diario</h1>
      },
      {
        path: "/index/profile",
        Component: () => <h1>Perfil</h1>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
