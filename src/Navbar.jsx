import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function AppBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <NavLink
            style={{ textDecoration: "none", color: "white" }}
            activeClassName="selected"
            className="not-selected"
            to="/"
            exact
          >
            Ambulance Management
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink
              style={{
                textDecoration: "none",
                color: "white",
                paddingRight: "10px",
              }}
              activeClassName="selected"
              className="not-selected"
              to="/register"
              exact
            >
              Register
            </NavLink>
            <NavLink
              style={{ textDecoration: "none", color: "white" }}
              activeClassName="selected"
              className="not-selected"
              to="/login"
              exact
            >
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default AppBar;
