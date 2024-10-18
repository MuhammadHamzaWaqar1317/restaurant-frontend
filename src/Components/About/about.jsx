import React, { useState, useEffect } from "react";
// Home CSS
import "./about.scss";
// useNavigate
import { useNavigate } from "react-router-dom";
// Images
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import facebook from "../../assets/facebook.png";
import linkdin from "../../assets/linkdin.png";
import twitter from "../../assets/twitter.png";
import OrderType from "../../assets/orderType.png";
import ReserveTable from "../../assets/reserveTable.png";
import Admin from "../../assets/admin.png";
import Branch from "../../assets/hotel.png";
import Tracking from "../../assets/tracking.png";

function About() {
  // useNavigate Variable
  const navigate = useNavigate();
  // - Search Bar Logic -
  const [isVisible, setIsVisible] = useState(false); // To toggle visibility

  const handleSearchClick = () => {
    setIsVisible(!isVisible); // Toggle search bar visibility
  };
  // Main Body
  return (
    <div className="My_Parent_About">
      {/* 1 - Navbar + Background */}
      <div className="Parent_Navbar_Whole">
        <div className="Sub_Parent_Navbar_Whole">
          {/* - Navbar - */}
          <div className="Navbar_Main">
            {/* - Part 1 - */}
            <div className="Navbar_Main_Part_1">
              <img src={logo} alt="NA" />
            </div>
            {/* - Part 2 - */}
            <div className="Navbar_Main_Part_2">
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li>Services</li>
                <li id="Special_Li">About</li>
                <li>Contact</li>
              </ul>
            </div>
            {/* - Part 3 - */}
            <div className="Navbar_Main_Part_3">
              {/* - Part 3 A - */}
              <div className="Navbar_Main_Part_3_A">
                <div
                  className="Navbar_Main_Part_3_A_Box"
                  onClick={handleSearchClick}
                >
                  <i className="fa fa-search"></i>
                </div>
              </div>
              <input
                type="search"
                placeholder=" Search Item here ... "
                className={isVisible ? "searchBar show" : "searchBar hide"}
              />
              {/* - Part 3 B - */}
              <div className="Navbar_Main_Part_3_B">
                {/* <button>JOIN</button> */}
                <a href="#" id="My_Btn" onClick={() => navigate("/login")}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  JOIN
                </a>
              </div>
              {/* Part 4 - ( Which Is Hide )*/}
              <div className="Navbar_Main_Part_4">
                <img src={menu} alt="NA" />
              </div>
            </div>
          </div>
          {/* Background Text */}
          <div className="Background_Txt_Parent">
            <h1>About Us</h1>
            <p>
              Discover our vision fueled by passion, innovation, and dedication
            </p>
          </div>
        </div>
      </div>
      {/* 2 - Who We Are */}
      <div className="Parent_WhoWe_Whole">
        <div className="Parent_WhoWe_Whole_Sub">
          <div className="WhoWe_Box">
            <h1>Who We Are</h1>
            <p>
              Mann-O-Salwa offer's a seamless dining experience with options to
              place delivery or takeaway orders. Customers can enjoy the
              convenience of "Cash on Delivery" as the sole payment method for
              all orders. Additionally, our platform allows users to easily
              reserve tables online, ensuring a hassle-free dining experience.
              Through our dedicated admin dashboard, we efficiently manage
              orders, reservations, and notifications to ensure everything runs
              smoothly.
            </p>
          </div>
        </div>
      </div>
      <div className="Parent_SecondAbout_Whole">
        <div className="Parent_SecondAbout_Whole_Sub">
          {/* --- Box Parent --- */}
          <div className="SecondAbout_Box">
            {/* Box */}
            <div className="SecondAbout_Box_Main">
              <div className="SecondAbout_Circle">
                <img src={OrderType} alt="NA" />
              </div>
              <p>Opt for home delivery or takeaway when ordering</p>
            </div>
            {/* Box */}
            <div className="SecondAbout_Box_Main">
              <div className="SecondAbout_Circle">
                <img src={ReserveTable} alt="NA" />
              </div>
              <p>Book your table online in Advance to skip the wait</p>
            </div>
            {/* Box */}
            <div className="SecondAbout_Box_Main">
              <div className="SecondAbout_Circle">
                <img src={Admin} alt="NA" />
              </div>
              <p>admin manages orders, reservations, Branches Menu</p>
            </div>
          </div>
          {/* --- Box Parent --- */}
          <div className="SecondAbout_Box">
            {/* Box */}
            <div className="SecondAbout_Box_Main">
              <div className="SecondAbout_Circle">
                <img src={Branch} alt="NA" />
              </div>
              <p>
                Customers select a branch before ordering or reserving a table
              </p>
            </div>
            {/* Box */}
            <div className="SecondAbout_Box_Main">
              <div className="SecondAbout_Circle">
                <img src={Tracking} alt="NA" />
              </div>
              <p>
                Track order status in real-time and manage reservation details
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* -------------- */}
      {/* - Write Here - */}
      {/* -------------- */}
      {/* 4 - Footer */}
      <div className="Parent_Footer_Whole">
        <div className="Parent_Footer_Whole_Sub">
          <div className="Footer_Box">
            <div className="Footer_Box_Part_1">
              <div className="Footer_Box_Part_1_A">
                <img src={logo} alt="NA" />
              </div>
              <div className="Footer_Box_Part_1_B">
                <ul>
                  <li>Home</li>
                  <li>Services</li>
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div className="Footer_Box_Part_1_C">
                <p>
                  Maan-O-Salva combines national culinary traditions with
                  European technology, offering fresh, high-quality dishes.
                </p>
              </div>
            </div>
            <div className="Footer_Box_Part_2">
              {/* - Icon Box - */}
              <div className="Footer_Box_Icon">
                <img src={facebook} alt="NA" />
              </div>
              {/* - Icon Box - */}
              <div className="Footer_Box_Icon">
                <img src={linkdin} alt="NA" />
              </div>
              {/* - Icon Box - */}
              <div className="Footer_Box_Icon">
                <img src={twitter} alt="NA" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* - */}
    </div>
  );
}

export default About;
