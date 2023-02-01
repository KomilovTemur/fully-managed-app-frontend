import React from "react";
import image from "../assets/undraw_remotely_2j6y.svg";
import http from "../utils/http";
import { useState } from "react";
import { useEffect } from "react";
const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  let email = localStorage.getItem("email");
  if (!(email == null)) {
    useEffect(() => {
      setUserDetails({
        email,
        password: "",
      });
    }, []);
  }

  const handeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await http.post("/login", userDetails);
      const { data } = res;
      if (!data.token) {
        alert(data.error);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", userDetails.email);
        window.location.href = "/"
      }
    } catch (error) {
      alert(error.message)
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center p-5">
      <div className="row">
        <h2 className="text-center">Login</h2>
        <form
          onSubmit={handeSubmit}
          className="col-md-6 bg-light shadow d-flex justify-content-center flex-column"
        >
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              required
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              required
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-dark w-100" type="submit">
            Login
          </button>
        </form>
        <div className="col-md-6">
          <img src={image} style={{ width: "500px" }} alt="Image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
