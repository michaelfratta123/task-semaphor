// Header.js
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header = ({ userData, handleLogout }) => {
  const linkStyle = {
    marginRight: 15,
    color: "white",
    textDecoration: "none",
    fontSize: "large",
  };

  return (
    <div
      className="m-3 bg-dark text-light p-3"
      style={{ display: "flex", alignItems: "center" }}
    >
      {userData && userData.isAdmin && (
        <Link to="/admin" style={linkStyle}>
          Admin
        </Link>
      )}
      {userData && (
        <>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Button
            variant="secondary"
            onClick={handleLogout}
            style={{ fontSize: "large" }}
          >
            Logout
          </Button>
        </>
      )}
      <h1 className="AppTitle fs-1 mx-5">TaskSemaphor</h1>
    </div>
  );
};

export default Header;
