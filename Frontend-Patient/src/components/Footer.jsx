import React from "react";
import { Link } from "react-router-dom";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="container">
        <hr />
        <div className="content">
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About Us</Link>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>999-999-9999</span>
            </div>
            <div>
              <MdEmail />
              <span>hopehealthcare@gmail.com</span>
            </div>
            <div>
            <FaLocationDot/>
            <span>Kerala, India</span>
            </div>
          </div>
        </div>
        <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Hope Healthcare</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
