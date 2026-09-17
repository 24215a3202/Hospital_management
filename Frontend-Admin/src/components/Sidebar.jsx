import React, { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
      .get("https://hospital-management-seven-gules.vercel.app/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="sidebar-brand">
          <span className="brand-mark">M</span>
          <div>
            <strong>Mobicure</strong>
            <small>Administration</small>
          </div>
        </div>
        <div className="links">
          <NavLink to="/" end onClick={() => setShow(false)}><TiHome /><span>Dashboard</span></NavLink>
          <NavLink to="/doctors" onClick={() => setShow(false)}><FaUserDoctor /><span>Doctors</span></NavLink>
          <NavLink to="/admin/addnew" onClick={() => setShow(false)}><MdAddModerator /><span>Add admin</span></NavLink>
          <NavLink to="/doctor/addnew" onClick={() => setShow(false)}><IoPersonAddSharp /><span>Add doctor</span></NavLink>
          <NavLink to="/messages" onClick={() => setShow(false)}><AiFillMessage /><span>Messages</span></NavLink>
        </div>
        <button className="logout-link" onClick={handleLogout}>
          <RiLogoutBoxFill /><span>Sign out</span>
        </button>
      </nav>
      <div
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="wrapper"
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;

