import React, { useState, useEffect } from "react";
import http from "../utils/http"
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const EditProfile = () => {
  const params = useParams();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    http
      .get(`/users/${params.username}`)
      .then((res) => {
        setError();
        setUser(res.data);
      })
      .catch(() => {
        setError(404);
      });
  }, [params.username]);
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setUser({ ...user, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios(`http://localhost:4444/users/${params.username}`, user, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        setError(404);
      });
  }
  return (
    <div>
      <h2>EditProfile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={user?.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          className="form-control my-2"
          placeholder="age"
          value={user?.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          value={user?.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="form-control my-2"
          placeholder="Email"
          value={user?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
        />
        <button className="btn btn-danger w-100 mt-2" type="submit">Update profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
