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
import Manage_Blog from "../../AllDashBoard/DashBoardComponent/Manage_Blog/Manage_Blog";
import Create_Project from "../../AllDashBoard/DashBoardComponent/Create_Project/Create_Project";
import Manage_Project from "../../AllDashBoard/DashBoardComponent/Manage_Project/Manage_Project";
import Manage_Admin from "../../AllDashBoard/DashBoardComponent/ManageAdminComponent/Manage_Admin/Manage_Admin";
import ViewAdmin from "../../AllDashBoard/DashBoardComponent/ManageAdminComponent/ViewAdmin/ViewAdmin";
import EditAdmin from "../../AllDashBoard/DashBoardComponent/ManageAdminComponent/EditAdminDetails/EditAdmin "
import Manage_Members from "../../AllDashBoard/DashBoardComponent/Manage_Members_Component/Manage_Member/Manage_Members";
import Member_Edit from "../../AllDashBoard/DashBoardComponent/Manage_Members_Component/Member_Edit/Member_Edit";
import Manage_View_Member from "../../AllDashBoard/DashBoardComponent/Manage_Members_Component/Manage_View_Member/Manage_View_Member";
import Create_Member from "../../AllDashBoard/DashBoardComponent/Create_Member/Create_Member"
import Admin_Aprove from "../../AllDashBoard/DashBoardComponent/AprovalPage/Admin_Aprove/Admin_Aprove";
import Member_Aprove from "../../AllDashBoard/DashBoardComponent/AprovalPage/Member_Aprove/Member_Aprove";
import AllProducts from "../Pages/ProductsComponents/AllProducts/AllProducts";
import Subscription_Manage from "../../AllDashBoard/DashBoardComponent/Subscription/Subscription_Manage/Subscription_Manage";
import Manage_Product from "../Pages/ProductsComponents/Manage_Product/Manage_Product";
import Create_Product from "../Pages/ProductsComponents/Create_Product/Create_Product";
import Update_Product from "../Pages/ProductsComponents/Update_Product/Update_Product";
import SubscriptionRenew from "../Pages/SubscriptionRenew/SubscriptionRenew";
import Edit_SubscriptionRenew from "../Pages/SubscriptionRenew/Edit_SubscriptionRenew";
import Renew_Approve_Subscription from "../../AllDashBoard/DashBoardComponent/Subscription/Renew_Approve_Subscription/Renew_Approve_Subscription";
import View_Renew_Subscription from "../../AllDashBoard/DashBoardComponent/Subscription/Renew_Approve_Subscription/View_Renew_Subscription";
import Profile from "../../Profile/Profile/Profile";
import View_Profile from "../../Profile/View_Profile/View_Profile";
import Edit_Profile from "../../Profile/Edit_Profile/Edit_Profile";




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

            
            {
                path:"/products",
                element:<AllProducts></AllProducts>
            },
            {
                path:"/Renew-subscription",
                element:<SubscriptionRenew></SubscriptionRenew>
            },
            {
                path:"/Edit_SubscriptionRenew/:id",
                element:<Edit_SubscriptionRenew></Edit_SubscriptionRenew>
            },
            {
                path: "/renew-view/:id",
                element: <View_Renew_Subscription></View_Renew_Subscription>
            },
            {
                path:"/profile",
                element:<Profile></Profile>
            },
            {
                path:"/edit-profile",
                element:<View_Profile></View_Profile>
            },
            {
                path: "/edit-profile/:id",
                element:<Edit_Profile></Edit_Profile>
            }


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
                path:"create-member",
                element:<Create_Member></Create_Member>
            },
            {
                path: "manage-admin",
                element:<Manage_Admin></Manage_Admin>
            },
            {
                path: "aprove-admin",
                element:<Admin_Aprove></Admin_Aprove>
            },
            {
                path: "create-blog",
                element:<Create_Blog></Create_Blog>
            },
            {
                path: "manage-blog",
                element:<Manage_Blog></Manage_Blog>
            },

            {
                path: "project-post",
                element:<Create_Project></Create_Project>
            },

            {
                path: "manage-project",
                element:<Manage_Project></Manage_Project>
            },
            {
                path: "/dashboard/user-details/:id",
                element:<ViewAdmin></ViewAdmin>
            },
            {
                path: "/dashboard/edit-admin/:id",
                element:<EditAdmin></EditAdmin>
            },
            {
                path: "manage-members",
                element:<Manage_Members></Manage_Members>
            },
            {
                path: "Aprove-members",
                element:<Member_Aprove></Member_Aprove>
            },
            {
                path: "/dashboard/edit-member/:id",
                element:<Member_Edit></Member_Edit>
            },
            {
                path: "/dashboard/member-details/:id",
                element:<Manage_View_Member></Manage_View_Member>
            },
            {
                path: "subscription",
                element: <Subscription_Manage></Subscription_Manage>
            },
            {
                path: "manage-product",
                element:<Manage_Product></Manage_Product>   
            },
            {
                path:"create-product",
                element:<Create_Product></Create_Product>
            },
            {
                path: "/dashboard/edit-product/:id",
                element:<Update_Product></Update_Product>
            },
            {
                path: "approve-renew-subscription",
                element:<Renew_Approve_Subscription></Renew_Approve_Subscription>
            },
          
            
        ]
    }

])