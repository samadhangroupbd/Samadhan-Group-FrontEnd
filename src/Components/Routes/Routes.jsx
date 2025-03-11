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
import ReferList from "../Pages/ReferList/ReferList";
import Dashboard_Statistic from "../../AllDashBoard/DashBoardComponent/Statistic/Dashboard_Statistic/Dashboard_Statistic"
import Work_Profile from "../../AllDashBoard/DashBoardComponent/ManageAdminComponent/Work_Profile/Work_Profile";
import InvoiceAndOthers from "../Pages/InvoiceAndOthers/InvoiceAndOthers/InvoiceAndOthers";
import Certificate from "../Pages/InvoiceAndOthers/Certificate/Certificate";
import IdCard from "../Pages/InvoiceAndOthers/IdCard/IdCard";
import PersonalInfo from "../Pages/InvoiceAndOthers/PersonalInfo/PersonalInfo";
import VisitingCard from "../Pages/InvoiceAndOthers/VisitingCard/VisitingCard";
import Invoice from "../Pages/InvoiceAndOthers/Invoice/Invoice";
import Organizer_Member from "../../AllDashBoard/DashBoardComponent/Manage_Members_Component/Organizer_Member/Organizer_Member";
import Organizer_Approve from "../../AllDashBoard/DashBoardComponent/AprovalPage/Organizer_Approve/Organizer_Approve";
import AppointmentLetter from "../Pages/InvoiceAndOthers/AppointmentLetter/AppointmentLetter";
import Manage_Employee from "../../AllDashBoard/DashBoardComponent/Manage_Employee_Components/Manage_Employee/Manage_Employee";
import Create_Employee from "../../AllDashBoard/DashBoardComponent/Manage_Employee_Components/Create_Employee/Create_Employee";
import Edit_Employee from "../../AllDashBoard/DashBoardComponent/Manage_Employee_Components/Edit_Employee/Edit_Employee";
import Employee_Approve from "../../AllDashBoard/DashBoardComponent/AprovalPage/Approve_Employee/Approve_Employee";
import View_Blog from "../../AllDashBoard/DashBoardComponent/Manage_Blog/View_Blog";
import Edit_Blog from "../../AllDashBoard/DashBoardComponent/Manage_Blog/Edit_Blog";
import About_Us from "../Pages/About_US/About_US";
import Contact from "../Pages/ContactPage/Contact";



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
                path: "/blog/:id",
                element: <View_Blog></View_Blog>
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
            },
            {
                path: "about-us",
                element: <About_Us></About_Us>
            },
            {
                path:"contact",
                element: <Contact></Contact>
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
                element:<Dashboard_Statistic></Dashboard_Statistic>

            },
            {
                path:"create-admin",
                element:<Create_Admin></Create_Admin>
            },
            {
                path:"/dashboard/create-employee",
                element:<Create_Employee></Create_Employee>
            },
            {
                path:"/dashboard/approve-employee",
                element:<Employee_Approve></Employee_Approve>
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
                path: "/dashboard/Edit_Blog/:id",
                element: <Edit_Blog></Edit_Blog>
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
                path: "/dashboard/work-profile/:id",
                element:<Work_Profile></Work_Profile>
            },
            
            {
                path: "/dashboard/file-manage/:id",
                element:<InvoiceAndOthers></InvoiceAndOthers>
            },
            {
                path: "/dashboard/id-card/:id",
                element:<IdCard></IdCard>
            },
            {
                path: "/dashboard/registration-form/:id",
                element:<PersonalInfo></PersonalInfo>
            },
            {
                path: "/dashboard/certificate/:id",
                element:<Certificate></Certificate>
            },
            {
                path: "/dashboard/appointment/:id",
                element:<AppointmentLetter></AppointmentLetter>
            },
            {
                path: "/dashboard/edit-admin/:id",
                element:<EditAdmin></EditAdmin>
            },
            {
                path: "/dashboard/edit-employee/:id",
                element:<Edit_Employee></Edit_Employee>
            },
            {
                path: "/dashboard/visiting-card/:id",
                element:<VisitingCard></VisitingCard>
            },
            {
                path: "/dashboard/invoice/:id",
                element:<Invoice></Invoice>
            },
            {
                path: "manage-members",
                element:<Manage_Members></Manage_Members>
            },
            {
                path: "manage-employee",
                element:<Manage_Employee></Manage_Employee>
            },
            {
                path: "/dashboard/approve-organizer",
                element: <Organizer_Approve></Organizer_Approve>
            },
            {
                path: "manage-organizer",
                element: <Organizer_Member></Organizer_Member>
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
            {
                path:"refer-list",
                element:<ReferList></ReferList>
            }
          
            
        ]
    }

])