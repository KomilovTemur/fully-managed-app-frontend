import React from "react";
import image from "../assets/undraw_remotely_2j6y.svg";
import http from "../utils/http";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handeSubmit = async (e) => {
    e.preventDefault();
    const res = await http.post("/signUp", userDetails);
    const { data } = res;
    console.log(data);
    if (data.error) {
      alert(data.error);
    } else {
      localStorage.setItem("email", data.email);
      navigate("/login");
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center p-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Sign Up</h2>
          <img src={image} style={{ width: "500px" }} alt="Image" />
        </div>
        <form
          onSubmit={handeSubmit}
          className="col-md-6 bg-light shadow d-flex justify-content-center flex-column"
        >
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              name="age"
              onChange={handleChange}
              type="number"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-dark w-100" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
