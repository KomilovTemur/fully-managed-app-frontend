import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import http from "../utils/http";
import NotFound from "./NotFound";
import EditProfile from "./EditProfile";
const Profile = () => {
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
  const shareAccount = () => {
    return window.location.href;
  };
  const isOwnProfile = () => {
    const email = localStorage.getItem("email");
    if (email == user?.email) {
      return true;
    } else {
      return false;
    }
  };
  const uploadFile = (e) => {
    const file = e.target.files[0]
    http.post(`/users/${user.username}/uploadAvatar`, file, {
      headers: {
        'Content-Type': "multipart/form-data",
        'Authorization': localStorage.getItem("token")
      }
    }).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err.response.data);
    })
  }
  return (
    <>
      {error ? (
        <NotFound />
      ) : (
        <div className="main d-flex">
          <div className="left-side text-success fw-bold p-2 d-flex flex-column border border-2 border-success rounded-start">
            <div className="user-avatart">
              <img
                src={"http://localhost:4444" + user?.avatar}
                alt={user?.name}
                style={{ width: "330px", height: "330px" }}
                className="rounded"
              />
              {isOwnProfile ? <form >
                <p className="text-dark mb-0">update avatar</p>
                <input
                  type="file"
                  name="avatar"
                  encType="multipart/form-data"
                  className="form-control"
                  onChange={uploadFile}
                />
              </form> : <></>}
            </div>
            <div className="details d-flex flex-column mt-2 fs-5">
              <p>
                <i className="fa-solid fa-address-card"></i> Hello my name is{" "}
                {user?.name}. I am {user?.age} years old
              </p>
              <p>
                <i className="fa-solid fa-envelope"></i> {user?.email}
              </p>
              <CopyToClipboard text={shareAccount()}>
                <p
                  onClick={() => alert("Account link copied to clipboard")}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-share-nodes"></i> @{user?.username}
                </p>
              </CopyToClipboard>
            </div>
          </div>
          <div className="right-side container-fluid rounded-end bg-success p-2 text-light">
            <EditProfile />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
