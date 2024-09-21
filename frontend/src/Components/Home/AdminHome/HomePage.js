import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import Card1 from "./img/user.png";
import Card2 from "./img/Training.png";
import Card3 from "./img/client.png";
import Card4 from "./img/Booking.png";
import Card5 from "./img/payment.png";
import Card6 from "./img/Operation.png";
import Card7 from "./img/Inventory.png";
import Card8 from "./img/Leave.png";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <div className="admin_dash_main">
        <h1 className="homepage_admin_title fade_up">Management Dashboard</h1>
        <div className="admindash_full">
          <div className="admin_card_container">
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/user/login")}
            >
              <img src={Card1} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">User Management</p>
            </div>
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/trainng/login")}
            >
              <img src={Card2} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">Training Management</p>
            </div>
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/clientlogin")}
            >
              <img src={Card3} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">Client Management</p>
            </div>
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/bookingmanagerlogin")}
            >
              <img src={Card4} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">Booking Management</p>
            </div>
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/paymentMnlogin")}
            >
              <img src={Card5} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">Payment Management</p>
            </div>
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/operatonlogin")}
            >
              <img src={Card6} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">Operation Management</p>
            </div>
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/inlogin")}
            >
              <img src={Card7} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">Inventory Management</p>
            </div>
            <div
              className="card_admin_dash fade_up"
              onClick={() => handleNavigation("/leavemanagement")}
            >
              <img src={Card8} alt="card_img" className="admin_card_img" />
              <p className="admin_topic_card">Leave Management</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
