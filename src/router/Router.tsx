import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Home/Layout";

// Lazy loading
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Home = lazy(() => import("../pages/Home/Home"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const EditProfile = lazy(() => import("../pages/Edit-Profile/Edit"));
const Create = lazy(() => import("../pages/Create-Post/Create"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "feeds",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "edit-profile",
        element: <EditProfile />
      },
      {
        path: "create-post",
        element: <Create />
      },
    ],
  },
]);

export default Router;
