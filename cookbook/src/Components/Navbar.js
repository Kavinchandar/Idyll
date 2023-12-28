import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import './Navbar.css';


const NavBarComponent = () => {
  
  return (
    <Navbar bg="light" variant="light" collapseOnSelect expand="lg" className="glass rounded-3">
      <Container>
        <Navbar.Brand style={{ fontSize: '30px',color: '#81BAB4' }} to="/">Idyll</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link ><Link to="/" style={{ fontSize: '20px', textDecoration: 'none', color:'black', marginRight:'50px'}}>Home</Link></Nav.Link>
            <Nav.Link ><Link to="/fridge" style={{ fontSize: '20px', textDecoration: 'none', color:'black'}}>Whats in your pantry?</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;