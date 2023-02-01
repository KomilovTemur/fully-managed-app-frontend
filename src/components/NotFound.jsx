import React from "react";
import image from "../assets/404.png";

const NotFound = () => {
  return (
    <div>
      <div className="alert alert-danger text-center">
        <h3 className="mb-0">Page not found</h3>
      </div>
      <img src={image} className="w-100" alt="404" />
    </div>
  );
};

export default NotFound;
