import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top" expand="md">
        <Container>
          <Nav className="me-auto">
            <svg width="50" height="50">
              <circle cx="25" cy="25" r="20" stroke="green" stroke-width="4" fill="yellow" />
              Jūsų naršyklė nepalaiko svg.
            </svg>
            <Nav.Link href="/FloorsPage">Aukštai</Nav.Link>
            <Nav.Link href="/Floor">Butai</Nav.Link>
            <Nav.Link href="/Floor">Gyventojai</Nav.Link>
            <Nav.Link href="/Floor">Žinutės</Nav.Link>
            <Nav.Link href="/">Atsijungti</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;