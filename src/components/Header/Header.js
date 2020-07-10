import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBtn
} from "mdbreact";

function Header(props) {
  const [navCollapse, setNavCollapse] = useState(() => {
      return ""
  })
  const [loggedIn, setLoggedIn] = useState(props.loggedIn)

  const userImage = "/images/stock-user.jpg";

  const loggedInView = 
    <MDBNavItem>
      <MDBDropdown>
        <MDBDropdownToggle className="dropdown-toggle" nav>
          <img
            src={userImage}
            className="rounded-circle z-depth-0"
            style={{ height: "30px", padding: 0 }}
            alt="Account Access"
          />
        </MDBDropdownToggle>
        <MDBDropdownMenu className="dropdown-default" right>
          <MDBDropdownItem href="#!">My account</MDBDropdownItem>
          <MDBDropdownItem href="#!" onClick={() => setLoggedIn(false)}>Log out</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavItem>

  const loggedOutView = 
    <MDBNavItem>
      <MDBBtn color="primary" size="sm" onClick={() => redirectToRegister()}>Register</MDBBtn>
      <MDBBtn outline color="primary" size="sm" onClick={() => setLoggedIn(true)}>Login</MDBBtn>
    </MDBNavItem>

  let accountDisplay = loggedIn ? loggedInView : loggedOutView

  const toggleCollapse = collapseId => {
      setNavCollapse(prevVal => prevVal !== collapseId ? collapseId : "")
  }

  const redirectToHome = () => {
    props.history.push('/');
  }

  const redirectToRegister = () => {
    props.history.push('/'); 
  }

  const redirectToMap = () => {
    window.open("https://routefront.herokuapp.com/")
  }

  const redirectToBars = () => {
    window.open("https://beercrawlfrontapp.herokuapp.com/")
  }

  const redirectToDashboard = () => {
    window.open("https://drinknavdashboardv3frontend.herokuapp.com/")
  }
  
  return (
    <header>
      <MDBNavbar
        color="unique-color-dark"
        dark
        expand="md"
        scrolling
        fixed="top"
      >
        <MDBNavbarBrand>
          <img style={{"width": "30px", "height": "30px"}} src="/images/logo.png" alt="logo" />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={() => toggleCollapse("navbarCollapse")} />
        <MDBCollapse id="navbarCollapse" isOpen={navCollapse} navbar>
          <MDBNavbarNav left>
            <MDBNavItem onClick={() => redirectToHome()} active>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem onClick={() => redirectToMap()}>
              <MDBNavLink to="#!">Map</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem onClick={() => redirectToBars()}>
              <MDBNavLink to="#!">Bars</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem onClick={() => redirectToDashboard()}>
              <MDBNavLink to="#!">Dashboard</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            {accountDisplay}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </header>
  );
}
export default withRouter(Header);
