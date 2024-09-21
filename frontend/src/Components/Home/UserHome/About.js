import React from "react";
import HomeNav from "./HomeNav";
import Footer from "./Footer";

function About() {
  return (
    <div>
      <HomeNav />
      <div className="about_bk">
        <h1 className="about_topic">About Us</h1>
      </div>
      <div className="home_container">
        <p>
          Our company was founded in 2007 and currently employs over 425 armed
          and unarmed security officers, front desk ambassadors, and access
          control officers. In the private sector, we have extensive experience
          providing security and front desk ambassador services to luxury
          condominiums, residential communities, clubhouses, commercial office
          buildings, construction sites, industrial properties, distribution
          centers, shopping malls, and industrial parks, among others. We are
          proud to mention that our first corporate client, a Fortune 500
          company, hired us for the first time in January 2008, and they are
          still one of our satisfied clients today.
        </p>
        <p>
          In the public sector, we provide services under government contracts
          at Miami International and Opa Locka airports, Miami Dade County
          courthouses, Miami Dade County parks and marinas, Tax Collector’s
          Office, Victims Advocacy Center, Abused Women’s Center, Water and
          Sewer pump stations and buildings, public libraries and other county
          buildings and facilities.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
