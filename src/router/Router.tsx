import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Home/Layout";

// Lazy loading
const Auth = lazy(() => import("../pages/Auth/Auth"));
const Home = lazy(() => import("../pages/Home/Home"));

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
    ],
  },
]);

export default Router;
