import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://hospital-management-seven-gules.vercel.app/api/v1/user/patient/register",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          gender,
          aadhar,
          dob,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="container auth-page register-page">
      <div className="auth-intro">
        <span className="eyebrow">Start your care journey</span>
        <h2>Make room for better health.</h2>
        <p>Create a secure patient profile to book appointments and stay close to your care team.</p>
        <div className="auth-stat"><strong>01</strong><span>Simple, thoughtful care</span></div>
      </div>
      <div className="auth-panel">
        <span className="form-kicker">Patient registration</span>
        <h3>Create your profile</h3>
        <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            value={phone}
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            value={aadhar}
            placeholder="Aadhar Number"
            onChange={(e) => setAadhar(e.target.value)}
          />
          <input
            type="date"
            value={dob}
            placeholder="Date of Birth"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

          <div className="form-switch">
            <p>Already registered?</p>
            <Link to={"/login"}>Sign in instead</Link>
          </div>
          <button type="submit">Create profile</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

