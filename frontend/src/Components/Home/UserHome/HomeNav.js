import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./img/logo.png";
import { useLocation } from "react-router-dom";
import "./home.css";
function HomeNav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user ? user.type : null;
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "nav_active" : "");

  return (
    <div>
      <div className="nav_bar_home">
        <div>
          <img src={Logo} alt="logo" className="logo_nav" />
        </div>
        <div className="nav_bar_item_main">
          <p
            className={`nav_item ${isActive("/home")}`}
            onClick={() => navigate("/home")}
          >
            Home
          </p>
          <p
            className={`nav_item ${isActive("/about")}`}
            onClick={() => navigate("/about")}
          >
            About
          </p>
          <p
            className={`nav_item ${isActive("/adminadminloginDash")}`}
            onClick={() => navigate("/adminloginDash")}
          >
            Admin
          </p>
          {/* Conditionally render based on user type */}
          {userType === "Employee" && (
            <>
              <p
                className={`nav_item ${isActive("/empallcourses")}`}
                onClick={() => navigate("/empallcourses")}
              >
                Courses
              </p>
              <p
                className={`nav_item ${isActive("/addleave")}`}
                onClick={() => navigate("/addleave")}
              >
                Leave
              </p>
            </>
          )}

          {userType === "Client" && (
            <>
              <p
                className={`nav_item ${isActive("/myinquiry")}`}
                onClick={() => navigate("/myinquiry")}
              >
                Inquiry
              </p>
              <p
                className={`nav_item ${isActive("/addbooking")}`}
                onClick={() => navigate("/addbooking")}
              >
                Bookings
              </p>
            </>
          )}
          <p
            className={`nav_item ${isActive("/")}`}
            onClick={() => navigate("/")}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeNav;
