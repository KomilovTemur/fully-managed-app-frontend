import React, { useState, useEffect } from "react";
import http from "../utils/http"
import { useParams, Link } from "react-router-dom";

const EditProfile = () => {
  const params = useParams();
  const [update, setUpdate] = useState({
    name: "",
    age: "",
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState();
  useEffect(() => {
    http
      .get(`/users/${params.username}`)
      .then((res) => {
        setError();
        setUpdate(res.data);
      })
      .catch(() => {
        setError(404);
      });
  }, [params.username]);
  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setUpdate({ ...update, [name]: value })
  }
  console.log(params.username);
  const handleSubmit = (e) => {
    e.preventDefault()
    http.patch(`/users/${params.username}`, update, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
      .then((res) => {
        alert("updated")
        setUpdate(res.data)
      }).catch(() => {
        setError(404);
      });
  }
  const deleteAccount = () => {
    const confirmation = confirm("Are you delete accound")
    if (!confirmation) {
      alert("canceled")
      return
    }
    http.delete(`/users/${update.username}`, {
      headers: {
        'Authorization': localStorage.getItem("token")
      }
    })
      .then(() => {
        alert("deleted")
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        window.location.href = "/"
      }).catch(() => {
        setError(500);
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
          value={update?.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          className="form-control my-2"
          placeholder="age"
          value={update?.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          value={update?.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="form-control my-2"
          placeholder="Email"
          value={update?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="d-flex">
          <button className="btn btn-warning w-100 mt-2" type="submit">Update profile</button>
          <button onClick={deleteAccount} type="button" className="btn btn-danger ms-2 w-100 mt-2">Delete account</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
