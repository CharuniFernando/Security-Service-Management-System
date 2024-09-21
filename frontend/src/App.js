import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./Components/Home/AdminHome/HomePage";
import AddItem from "./Components/Inventory Management/Items/Admin/Add-Items/AddItem";
import ItemDetails from "./Components/Inventory Management/Items/Admin/Item/ItemDetails";
import InventoryLogin from "./Components/Inventory Management/Items/Login/Login";
import AddUser from "./Components/User Managment/AddUser/AddUser";
import UserDetails from "./Components/User Managment/UserDetails/Useretails";
import UpdateEmploye from "./Components/User Managment/UpdateUser/UpdateUser";
import Profile from "./Components/User Managment/Profile/Profile";
import AdminLogin from "./Components/User Managment/LoginAdmin/Login";
import UserLogin from "./Components/User Managment/UserLogin/UserLogin";
import AddCourse from "./Components/Training Management/AddCourse/AddCourse";
import AllCourses from "./Components/Training Management/Course/CourseDetails";
import TraineeLogin from "./Components/Training Management/Login/Login";
import AllCoursesAdmin from "./Components/Training Management/AllCourses/AllCourseDetails";
import AddInquiry from "./Components/Client Management/AddInquiry/AddInquery";
import AllInquires from "./Components/Client Management/AllInquires/AllInquires";
import ClientManagerLogin from "./Components/Client Management/Login/Login";
import AddBooking from "./Components/Booking Management/AddBooking/AddBooking";
import AllBookings from "./Components/Booking Management/AllBookings/AllBookings";
import BookingManagerLogin from "./Components/Booking Management/Login/Login";
import AddPayment from "./Components/Payment Management/Add Payment/AddPayment";
import Payments from "./Components/Payment Management/AllPayments/Payments";
import PaymentManagerLogin from "./Components/Payment Management//Login/Login";
import AddOperations from "./Components/Operation Management/AddOperation/AddOperation";
import Operations from "./Components/Operation Management/View Operation/Operation";
import OperationManagerLogin from "./Components/Operation Management/Login/Login";
import Home from "./Components/Home/UserHome/Home";
import UpdateProfile from "./Components/User Managment/Profile/UpdateProfile";
import AdminDashLogin from "./Components/Home/AdminHome/AdminDashLogin";
import UpdateCourse from "./Components/Training Management/UpdateCourse/UpdateCourse";
import UpdateInquiry from "./Components/Client Management/UpdateInquiry/UpdateInquiry";
import UpdateBooking from "./Components/Booking Management/UpdateBooking/UpdateBooking";
import Bookings from "./Components/Operation Management/Bookings/Bookings";
import UpdatePayment from "./Components/Payment Management/UpdatePayment/UpdatePayment";
import About from "./Components/Home/UserHome/About";
import CourseUser from "./Components/Training Management/CourseUser/CourseUser";
import LeveLogin from "./Components/LeaveManagement/Login/LeveLogin";
import AddLeave from "./Components/LeaveManagement/Dash/AddLeave";
import LeaveDash from "./Components/LeaveManagement/Dash/LeaveDash";
import UpdateLeave from "./Components/LeaveManagement/Dash/UpdateLeave";
import MyInquiry from "./Components/Client Management/MyInquiry/MyInquiry";
import GmailPw from "./Components/User Managment/ForgotPW/GmailPw";
import ValidateCode from "./Components/User Managment/ForgotPW/ValidateCode";
import UpdatePw from "./Components/User Managment/ForgotPW/UpdatePw";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*Home Page Admin*/}
          <Route path="/admin" element={<HomePage />} />
          <Route path="/adminloginDash" element={<AdminDashLogin />} />
          {/*Home Page User*/}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/*Inventory Managemnet System*/}
          <Route path="/inlogin" element={<InventoryLogin />} />
          <Route path="/inventory/additem" element={<AddItem />} />
          <Route path="/inventory/itemdash" element={<ItemDetails />} />
          {/*User Managemnet System*/}
          <Route path="/user/adduser" element={<AddUser />} />
          <Route path="/useredetails" element={<UserDetails />} />
          <Route path="/user/updateemploye/:id" element={<UpdateEmploye />} />
          <Route path="/userproupdate/:id" element={<UpdateProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/user/login" element={<AdminLogin />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/gmailveryfy" element={<GmailPw />} />
          <Route path="/updatepw" element={<UpdatePw />} />
          {/*Training Managemnet System*/}
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/coursedash" element={<AllCourses />} />
          <Route path="/trainng/login" element={<TraineeLogin />} />
          <Route path="/allcourses" element={<AllCoursesAdmin />} />
          <Route path="/empallcourses" element={<CourseUser />} />
          <Route path="/updatecourse/:id" element={<UpdateCourse />} />
          {/*Client Managemnet System*/}
          <Route path="/addinquiry" element={<AddInquiry />} />
          <Route path="/inquiresdash" element={<AllInquires />} />
          <Route path="/clientlogin" element={<ClientManagerLogin />} />
          <Route path="/myinquiry" element={<MyInquiry />} />
          <Route path="/verifycode" element={<ValidateCode />} />
          <Route path="/updateInqu/:id" element={<UpdateInquiry />} />
          {/*Booking Managemnet System*/}
          <Route path="/addbooking" element={<AddBooking />} />
          <Route path="/bookingdash" element={<AllBookings />} />
          <Route
            path="/bookingmanagerlogin"
            element={<BookingManagerLogin />}
          />
          <Route path="/updateboking/:id" element={<UpdateBooking />} />
          {/*Payment Managemnet System*/}
          <Route path="/addpayment" element={<AddPayment />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/paymentMnlogin" element={<PaymentManagerLogin />} />
          <Route path="/updatepaymnt/:id" element={<UpdatePayment />} />
          {/*Operation Managemnet System*/}
          <Route path="/add-operation" element={<AddOperations />} />
          <Route path="/operations" element={<Operations />} />
          <Route path="/operatonlogin" element={<OperationManagerLogin />} />
          <Route path="/bookingsall" element={<Bookings />} />
          {/*Leve Management */}
          <Route path="/leavemanagement" element={<LeveLogin />} />
          <Route path="/addleave" element={<AddLeave />} />
          <Route path="/levedash" element={<LeaveDash />} />
          <Route path="/updateleave/:id" element={<UpdateLeave />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
