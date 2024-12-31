import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../Pages/HomeComponents/Home/Home";
import ErrorPage from "../Pages/ErrorHandlingPage/ErrorPage/ErrorPage";
import HomeProjectDetails from "../Pages/HomeComponents/HomeSection/HomeProjectDetails/HomeProjectDetails";
import HomeProductDetail from "../Pages/HomeComponents/HomeSection/HomeProductDetail/HomeProductDetail";
import BlogDetails from "../Pages/HomeComponents/HomeBlogDetails/HomeBlogDetails";
import Login from "../Authentication/Login/Login";
import Registration from "../Authentication/Registration/Registration";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },

            {
                path: "/project/:id", // Dynamic route for project details
                element: <HomeProjectDetails />,
            },
            {
                path:"/product/:id",
                element:<HomeProductDetail></HomeProductDetail>
            },
            {
                path:"/blog/:id",
                element:<BlogDetails></BlogDetails>
            },

        ]

    },

    {
        path:"/login",
        element:<Login></Login>
      },
  
      {
        path:"/registration",
        element:<Registration></Registration>
      },

])