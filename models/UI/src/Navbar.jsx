import { Navbar, Container, Nav, NavItem } from 'react-bootstrap';
import { Link, BrowserRouter } from 'react-router-dom';

function MyNavbar() {
  return (
    <BrowserRouter basename="/">
      <Navbar bg="secondary" variant="light" expand="lg">
        <Container>
          <Navbar.Brand style= {{color : 'white' }}href="#home">Patrimoine</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <NavItem className='me-5'>
                <Link to="/">Possessions</Link>
              </NavItem>
              <NavItem className='me-5' style={{ color: 'black !important' }}>
                <Link to="/patrimoine">Patrimoine</Link>
              </NavItem>
              <NavItem className='me-5' style={{ color: 'black !important' }}>
                <Link to="/create">CreatePossession</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </BrowserRouter>
  );
}

export default MyNavbar;