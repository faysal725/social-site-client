import React, { useState } from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { connect } from 'react-redux';
import { removeUser } from '../../../Redux/Action/LoginAction';
import './Menu.css'
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

const Menu = (props) => {
    

    console.log(props)
    const {loggedUser, isLoggedIn, removeUser} = props
    const [loggedIn, setLoggedIn] = useState(false)
    console.log(removeUser)
    return (
        <Navbar bg="light" expand="md">
        <Container>
        <Navbar.Brand href="#home">FakeBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
        <Nav.Link className="menuItem"><Link className="menuBtn" to="/home">Home</Link></Nav.Link>
        <Nav.Link className="menuItem"><Link className="menuBtn" to="/login">Login</Link></Nav.Link>
        <Nav.Link className="menuItem"><Link className="menuBtn" to="/about">About</Link></Nav.Link>
        <Nav.Link className="menuItem"><Link className="menuBtn" to="/blog">Blog</Link></Nav.Link>
        </Nav>
        </Navbar.Collapse>
        {
            loggedUser[0].isLoggedIn === true? <button className="logOutBtn" onClick={() => removeUser()}>Logout</button> : <p></p>
        }
        

        </Container>
        </Navbar>
    );
};


const mapStateToProps = state =>{

    return{
    loggedUser: state.loggedUser,
    defaultUser: state.defaultUser
    }
}

const mapDispatchToProps = {
        removeUser: removeUser

}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);