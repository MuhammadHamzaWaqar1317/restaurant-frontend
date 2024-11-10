import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Badge } from "antd";
import { getMenuThunk } from "../../Redux/Thunks/MenuApi";
import CartDrawer from "../User/CartDrawer/CartDrawer";
import { addToCart } from "../../Redux/Slices/UserSlice";
import MenuItems from "../User/MenuItems/MenuItems";
// useNavigate
import { useNavigate } from "react-router-dom";
// Images
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import sec_1 from "../../assets/second_1.png";
import sec_2 from "../../assets/second_2.png";
import Chicken_1 from "../../assets/Menu_Pics/Chicken1.jpg";
import Chicken_2 from "../../assets/Menu_Pics/Chicken2.jpg";
import Chicken_3 from "../../assets/Menu_Pics/Chicken3.jpg";
import Burger_1 from "../../assets/Menu_Pics/burger1.jpg";
import Burger_2 from "../../assets/Menu_Pics/burger2.jpg";
import Burger_3 from "../../assets/Menu_Pics/burger3.jpg";
import Salad_1 from "../../assets/Menu_Pics/Salad1.jpg";
import Salad_2 from "../../assets/Menu_Pics/Salad2.jpg";
import Salad_3 from "../../assets/Menu_Pics/Salad3.jpg";
import Drink_1 from "../../assets/Menu_Pics/drink1.jpg";
import Drink_2 from "../../assets/Menu_Pics/drink2.jpg";
import Drink_3 from "../../assets/Menu_Pics/drink3.jpg";
import Sauce_1 from "../../assets/Menu_Pics/sauce1.jpg";
import Sauce_2 from "../../assets/Menu_Pics/sauce2.jpg";
import Sauce_3 from "../../assets/Menu_Pics/sauce3.jpg";
import Fries_1 from "../../assets/Menu_Pics/fries1.jpg";
import Fries_2 from "../../assets/Menu_Pics/fries2.jpg";
import Fries_3 from "../../assets/Menu_Pics/fries3.jpg";
import facebook from "../../assets/facebook.png";
import linkdin from "../../assets/linkdin.png";
import twitter from "../../assets/twitter.png";
import search from "../../assets/search.png";
// Home CSS
import "./home.scss";

function Home() {
  // useNavigate Variable
  const navigate = useNavigate();
  // Chicken API Item
  const dispatch = useDispatch();
  const { Fries, Burger, Chicken, Salads, Drinks, Sauces } = useSelector(
    (state) => state.menuSlice.menu
  );
  const cart = useSelector((state) => state.userSlice.cart);

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    dispatch(getMenuThunk());
  }, []);

  // --- Responsive Input Search Btn ---
  const [isInputVisible, setIsInputVisible] = useState(false);
  const toggleInputVisibility = () => {
    setIsInputVisible((prev) => !prev);
  };
  // --- Responsive Input Search Btn ---
  // --- Responsive Input Box ---
  const [isInputVisible_1, setIsInputVisible_1] = useState(false);
  const toggleInputVisibility_1 = () => {
    setIsInputVisible_1((prev) => !prev);
  };
  // --- Responsive Input Search Btn ---

  // - Search Bar Logic -
  const [isVisible, setIsVisible] = useState(false); // To toggle visibility

  const handleSearchClick = () => {
    setIsVisible(!isVisible); // Toggle search bar viibility
  };
  // Main Body
  return (
    <div className="My_Parent">
      <CartDrawer open={openDrawer} setOpen={setOpenDrawer} />
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
                <li id="Special_Li">Home</li>
                {/* <li>Services</li> */}
                <li onClick={() => navigate("/about")}>About</li>
                <li onClick={() => navigate("/contact")}>Contact</li>
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
              {/* --- My Cart Btn --- */}
              <Badge count={cart?.length} color="green">
                <Button
                  className="My_Cart_Btn"
                  type="link"
                  onClick={() => setOpenDrawer(true)}
                >
                  {/* <ShoppingCartOutlined color="white" /> */}
                  <i class="fa fa-cart-plus"></i>
                </Button>
              </Badge>
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
                <img src={menu} alt="NA" onClick={toggleInputVisibility_1} />
              </div>
            </div>
          </div>
          {/* Background Text */}
          <div className="Background_Txt_Parent">
            <h1>Cravings, Delivered Hot</h1>
            <p>
              Experience flavors that spark joy in every bite. Let us deliver
              fresh, straight to your doorstep, whenever hunger calls.
            </p>
          </div>
        </div>
      </div>
      {/* 2 - Opens + Rating */}
      <div className="Parent_Opens_Whole">
        <div className="Parent_Opens_Whole_Sub">
          {/* Box */}
          <div className="Box_Open_Main">
            <div className="Box_Open_Main_Part_1">
              <img src={sec_2} alt="NA" />
            </div>
            <div className="Box_Open_Main_Part_2">Rating 9.9</div>
          </div>
          {/* Box */}
          <div className="Box_Open_Main">
            <div className="Box_Open_Main_Part_1">
              <img src={sec_1} alt="NA" />
            </div>
            <div className="Box_Open_Main_Part_2">Opens Till 12.00</div>
          </div>
        </div>
      </div>

      {/* 3 - Menu - ( New ) */}
      <div className="Parent_Menu_Whole p-1">
        <div className="Parent_Menu_Whole_Sub">
          <MenuItems />
        </div>
      </div>
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
                  {/* <li>Services</li> */}
                  <li onClick={() => navigate("/about")}>About</li>
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
      {/* --- 7 - Responsive Navbar --- */}
      {isInputVisible_1 && (
        <div className="Parent_ResNav_Whole">
          <div className="Parent_ResNav_Whole_Sub">
            <div className="ResNav_Box">
              <ul>
                <li id="MyActive">Home</li>
                <li onClick={() => navigate("/about")}>About</li>
                <li>Contact Us</li>
              </ul>
              <img src={search} alt="NA" onClick={toggleInputVisibility} />
              {isInputVisible && (
                <input type="search" placeholder="Search Item here ..." />
              )}
              <a href="#" id="My_Btn" onClick={() => navigate("/login")}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                JOIN
              </a>
            </div>
          </div>
        </div>
      )}
      {/* - */}
    </div>
  );
}

export default Home;
