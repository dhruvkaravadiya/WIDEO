import React from "react";
import "./assets/css/index.css";
import Body from "./components/Shared/Body";
import MenuNavbar from "./components/Shared/MenuNavbar";
import FeedBack from "./components/Pages/FeedBack";
import Error from './components/Pages/Error';
import Contact from './components/Pages/Contact';
import VideoPage from "./components/Pages/VideoPage";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <div className="app-container flex h-screen">
        <MenuNavbar />
        <Outlet />
      </div>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false}/>
    </>
  );
}

export const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<Error/>,
        children:[
            {
                path:"/",
                element:<Body/>, 
            },
            {
                path:"/feedback",
                element:<FeedBack/>
            },
            {
              path:"/contact",
              element:<Contact/>
            },
            {
              path:"/video/:vID",
              element:<VideoPage/>
            },
            {
              path:"/login",
              element:<Login/>
            },
            {
              path:"/register",
              element:<SignUp/>
            }
        ],      
    },
]);
