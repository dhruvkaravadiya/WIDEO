import React, { lazy, Suspense, useState, useEffect } from "react";
import "./assets/css/index.css";
import Body from "./components/Shared/Body";
import MenuNavbar from "./components/Shared/MenuNavbar";
import FeedBack from "./components/Pages/FeedBack";
import Error from "./components/Pages/Error";
import Contact from "./components/Pages/Contact";
import EditVideo from "./components/Pages/EditVideo";
const VideoPage = lazy(() => import("./components/Pages/VideoPage"));
import Subscribed from "./components/Pages/Subscribed";
const Login = lazy(() => import("./components/Pages/Login"));
const SignUp = lazy(() => import("./components/Pages/SignUp"));
const YourVideos = lazy(() => import("./components/Pages/YourVideos"));
const TrendVideos = lazy(() => import("./components/Pages/TrendVideos"));

import { createHashRouter, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import NewVideo from "./components/Pages/NewVideo";

const store = configureStore({
  reducer: rootReducer
});

export default function App() {
  return (
    <Provider store={store}>
      <div className="app-container flex h-screen">
        <MenuNavbar />
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
      />
    </Provider>
  );
}
export const appRouter = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/trending",
        element:
          <Suspense>
            <TrendVideos />
          </Suspense>
      },
      {
        path: "/subscribed",
        element: <Subscribed />
      },
      {
        path: "/feedback",
        element: <FeedBack />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/video/:vID",
        element: <Suspense><VideoPage /></Suspense>,
      },
      {
        path: "/yourvideos",
        element: (
          <Suspense>
            <YourVideos />
          </Suspense>
        ),
      },
      {
        path: '/yourvideos/edit/:videoId', // Dynamic route parameter
        element: <EditVideo />
      },
      {
        path: "/login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path:"/newvideo",
        element:(<NewVideo/>),
      }
    ],
  },
]);
