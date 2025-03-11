import React from "react";
import HomeBanner from "../HomeSection/HomeBanner/HomeBanner";
import ServiceOffers from "../HomeSection/ServiceOffers/ServiceOffers";
import ChooseUs from "../HomeSection/ChooseUs/ChooseUs";
import TrustedBrand from "../HomeSection/TrustedBrand/TrustedBrand";
import CompanyMission from "../HomeSection/CompanyMission/CompanyMission";
import HomeProjects from "../HomeSection/HomeProjects/HomeProjects";
import Testimonials from "../Testimonials/Testimonials";
import HomeProduct from "../HomeSection/HomeProduct/HomeProduct";
import HomeBlog from "../HomeBlog/HomeBlog";
import AllWebsiteShow from "../AllWebsiteShow/AllWebsiteShow";

const Home = () =>{
    return(
        <div>
            <HomeBanner></HomeBanner>
            <ServiceOffers></ServiceOffers>
            <TrustedBrand></TrustedBrand>
            <ChooseUs></ChooseUs>
            <CompanyMission></CompanyMission>
            {/* <HomeProjects></HomeProjects> */}
            {/* <AllWebsiteShow></AllWebsiteShow> */}
            <Testimonials></Testimonials>
            <HomeProduct></HomeProduct>
            <HomeBlog></HomeBlog>
        </div>
    )
}

export default Home;