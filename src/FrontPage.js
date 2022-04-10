import { Navbar, Container, Nav, Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export function FrontPage() {
  const history = useHistory();
  return (
    <div>
      <header>
        <div>
          <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
              <Navbar.Brand>Scrapper</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link onClick={() => history.push("/login")}>
                    login
                  </Nav.Link>
                  <Nav.Link onClick={() => history.push("/signup")}>
                    signup
                  </Nav.Link>
                  <Nav.Link onClick={() => history.push("/demo-login")}>
                    Demo login
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </header>
      <br />

      <main>
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="main-image"
              src="https://landingcube.com/wp-content/uploads/2020/09/2-step-field-asins-1-1030x428.jpg"
              alt="First slide"
            />

            <Carousel.Caption>
              <h3>Copy The Product Url</h3>
              <p>
                Go the product page and copy the url of the website, and paste
                it in our website
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="main-image"
              src="https://www.seethewhizard.com/wp-content/uploads/Blog-Price.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Set Your Price</h3>
              <p>Enter your buying price</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="main-image"
              src="https://www.loginworks.com/wp-content/uploads/2020/06/blog_image_amazon_data_2nd_june_website-2.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Start Scrapping</h3>
              <p>
                Click start to monitor the price of the product and get
                notification
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div>
          <h1>Features</h1>
          <div className="feature-div">
            <p className="feature-para">
              Check the price of the product every 8 hours
            </p>
            <p className="feature-para">
              Get mail notification once the product is at your buying cost
            </p>
            <p className="feature-para">
              View the details of the product in our site
            </p>
          </div>
        </div>
      </main>

      <footer>
        <div className="footer-div">
          <p>Price</p>
          <p>Contacts</p>
          <p>Career</p>
          <p>Adresss</p>
        </div>
      </footer>
    </div>
  );
}
