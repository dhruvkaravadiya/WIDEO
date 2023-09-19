import React, { lazy, Suspense, useState, useEffect } from "react";
import "./assets/css/index.css";
import Body from "./components/Shared/Body";
import MenuNavbar from "./components/Shared/MenuNavbar";
import FeedBack from "./components/Pages/FeedBack";
import Error from "./components/Pages/Error";
import Contact from "./components/Pages/Contact";
import VideoPage from "./components/Pages/VideoPage";
const Login = lazy(() => import("./components/Pages/Login"));
const SignUp = lazy(() => import("./components/Pages/SignUp"));
const YourVideos = lazy(() => import("./components/Pages/YourVideos"));
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import TrendVideos from "./components/Pages/TrendVideos";

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
export const appRouter = createBrowserRouter([
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
        element: <TrendVideos />
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
        element: <VideoPage />,
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
    ],
  },
]);
