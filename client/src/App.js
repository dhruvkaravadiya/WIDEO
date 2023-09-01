import React from "react";
import "./css/App.css";
import Body from "./components/Body/Body";
import MenuNavbar from "./components/MenuNavbar";
import FeedBack from "./components/Pages/FeedBack";
import Error from './components/Helpers/Error';
import Contact from './components/Pages/Contact';
import VideoPage from "./components/VideoPage";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./components/Pages/Login";
export default function App() {
  return (
  
  
    <div className="app-container flex h-screen">
      <MenuNavbar />
      <Outlet />
    </div>
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
            }
        ],      
    },
]);

