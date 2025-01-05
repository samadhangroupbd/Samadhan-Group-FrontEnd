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
import Statistic from "../../AllDashBoard/DashBoardComponent/Statistic/Statistic";
import DashboardLayout from "../../AllDashBoard/DashboardLayout/DashboardLayout";
import Create_Admin from "../../AllDashBoard/DashBoardComponent/Create_Admin/Create_Admin";
import Create_Blog from "../../AllDashBoard/DashBoardComponent/Create_Blog/Create_Blog";
import BlogMain from "../Pages/BlogComponents/BlogMain/BlogMain";
import Manage_Admin from "../../AllDashBoard/DashBoardComponent/Manage_Admin/Manage_Admin";
// import DashboardLayout from "../../AllDashBoard/DashboardLayout/DashboardLayout";



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
                path: "/product/:id",
                element: <HomeProductDetail></HomeProductDetail>
            },

            {
                path:'/blog',
                element:<BlogMain></BlogMain>
            },

            {
                path: "/blog/:id",
                element: <BlogDetails></BlogDetails>
            },

        ]

    },

    {
        path: "/login",
        element: <Login></Login>
    },

    {
        path: "/registration",
        element: <Registration></Registration>
    },


    // Dashboard 

    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"statistic",
                element:<Statistic></Statistic>

            },
            {
                path:"create-admin",
                element:<Create_Admin></Create_Admin>
            },
            {
                path: "create-blog",
                element:<Create_Blog></Create_Blog>
            },
            {
                path: "manage-admin",
                element:<Manage_Admin></Manage_Admin>
            }
        ]
    }

])