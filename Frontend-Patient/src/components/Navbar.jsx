import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("https://hospital-management-seven-gules.vercel.app/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        setMenuOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const gotoLogin = async () => {
    navigateTo("/login");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="container">
        <div className="logo">
          {" "}
          <img src="/newlogo.png" alt="Mobicure" className="logo-img" onClick={()=>navigateTo("/")}/>
        </div>
        <div className={menuOpen ? "navLinks menu-open" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={closeMenu}>Home</Link>
            <Link to={"/appointment"} onClick={closeMenu}>Appointment</Link>
            <Link to={"/about"} onClick={closeMenu}>About Us</Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="logoutBtn btn" onClick={gotoLogin}>
              Login
            </button>
          )}
        </div>
        <div
          className="hamburger"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
         {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />} 
        </div>
      </nav>
    </>
  );
};

export default Navbar;

