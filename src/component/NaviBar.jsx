import React from "react";
import { Navbar, Nav, NavDropdown, useAccordionButton } from "react-bootstrap";
import "../component/Navibar.css";
import { MdOutlineAccountCircle, MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Navibar = () => {
  // take username from redux
  const dataUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch({
      type: "logout",
    });
    localStorage.removeItem("id");
  };
  return (
    <div>
      <Navbar expand="lg" fixed="top" className="navibar-coffee">
        <Navbar.Brand href="#home" className="nav-text">
          Senja Coffee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-text">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/Produk" className="nav-text">
              Product
            </Nav.Link>
          </Nav>
          <NavDropdown
            title={<MdOutlineAccountCircle className="icon-navbar" />}
            id="basic-nav-dropdown"
            className="me-4"
          >
            {" "}
            {dataUser.username ? (
              <>
                <NavDropdown.Item href="#action/3.1">
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">History</NavDropdown.Item>
                <NavDropdown.Item onClick={() => Logout()}>
                  Log Out
                </NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            )}
          </NavDropdown>
          <Nav.Link href="#link" className="nav-text" className="me-3">
            <MdOutlineShoppingCart className="icon-navbar" />
          </Nav.Link>
          <Nav></Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navibar;
