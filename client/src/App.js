import React, { lazy, Suspense , useState, useEffect} from "react";
import "./assets/css/index.css";
import Body from "./components/Shared/Body";
import MenuNavbar from "./components/Shared/MenuNavbar";
import FeedBack from "./components/Pages/FeedBack";
import Error from "./components/Pages/Error";
import Contact from "./components/Pages/Contact";
import VideoPage from "./components/Pages/VideoPage";
const Login = lazy(() => import("./components/Pages/Login"));
const SignUp = lazy(() => import("./components/Pages/SignUp"));
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userContext from "./components/Helpers/UserContext";
export default function App() {
  const [user, setUser] = useState({
    id : null,
    name: null,
    email: null,
    password: null,
});
useEffect(() => {
  // Check if user data exists in localStorage
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData) {
      // If user data is found, parse it and set it as the initial user context
      const parsedUserData = JSON.parse(storedUserData);
      setUser(parsedUserData);
  }
}, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <div className="app-container flex h-screen">
        <MenuNavbar />
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
      />
    </userContext.Provider>
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
        path: "/yourvideos/:userID",
        element: <VideoPage />,
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
