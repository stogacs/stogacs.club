import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Scrollspy from "react-scrollspy";

import { ExperiencesComponent } from "./Experiences";
import { PicturesComponent } from "./Pictures";
import { ContactsComponent } from "./Contacts";

export class RootComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <Router>
        <Navbar id="navbar" fixed="top" variant="dark" bg="dark" expand="lg">
          <Container className="pr-0 pl-0">
            <Navbar.Brand href="#home" className="navbar-title text-light">
              StogaCS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav variant="pills" className="ml-auto">
                <Scrollspy
                  currentClassName="nav-link-scrolled"
                  items={["experiences", "pictures", "contacts"]}
                  componentTag="span"
                  offset={-2}
                >
                  <HashLink smooth to="#experiences" className="nav-section-link">
                    Experience
                  </HashLink>
                  <HashLink smooth to="#pictures" className="nav-section-link">
                    Pictures
                  </HashLink>
                  <HashLink smooth to="#contacts" className="nav-section-link">
                    Contacts
                  </HashLink>
                </Scrollspy>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <header id="home" className="header-section"></header>

        <div>
          <section id="experiences">
            <ExperiencesComponent />
          </section>

          <section id="pictures">
            <PicturesComponent />
          </section>

          <section id="contacts">
            <ContactsComponent />
          </section>
        </div>
      </Router>
    );
  }
}
