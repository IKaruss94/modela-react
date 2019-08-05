/** [] Imported @ 
 * src/components/views/index.js
 * 
 * manualy updated 06/06/2019
*/ 

// [] fundemental components
    import React, { Component } from "react"
// [] structure and style components
    import { Nav, Navbar } from "react-bootstrap"
    import { LinkContainer } from "react-router-bootstrap"
// [] my images
    import Logo from '../../../images/icons/icon-modela.png'

// -------------------------------------------------------------------------------

class AdminNavigation extends Component {    
    render() {        
        //console.log('admin navbar props:', this.props);

        return(     
            <Navbar expand="lg" fixed="top">

                <Navbar.Brand href="#home">
                    <LinkContainer to="/">
                        <img src={ Logo } id="img_logo" alt="Modela" />
                    </LinkContainer>               
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="my_navbar_collapse">
                    <Nav className="mr-auto">

                        <LinkContainer key="admin_products" to="/_admin/products">
                            <Nav.Link className="my_navbar_elem">Products</Nav.Link>
                        </LinkContainer>

                        <LinkContainer key="admin_orders" to="/_admin/orders">
                            <Nav.Link className="my_navbar_elem">Orders</Nav.Link>
                        </LinkContainer>

                        <LinkContainer key="admin_lables" to="/_admin/lables">
                            <Nav.Link className="my_navbar_elem">Lables</Nav.Link>
                        </LinkContainer>

                        <LinkContainer key="admin_texts" to="/_admin/texts">
                            <Nav.Link className="my_navbar_elem">Texts</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer key="admin_logout" to="/_admin/login">
                            <Nav.Link className="my_navbar_elem">LOGOUT</Nav.Link>
                        </LinkContainer>

                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        )
    }
}


export default (AdminNavigation)