/** [] Imported @ 
 * src/components/views/index.js
 * 
 * manualy updated 06/06/2019
*/ 

// [] fundemental components
    import React, { Component } from "react" //, Fragment
// [] structure and style components
    import { Nav, Navbar } from "react-bootstrap"
    //import Sidebar from "react-sidebar"
    import { LinkContainer } from "react-router-bootstrap"
// [] my images
    import Logo from '../../../images/icons/icon-modela.png'

// -------------------------------------------------------------------------------

class AdminNavigation extends Component {   
    /* 
    constructor(props){
        super(props);
        this.state = {
            sidebarOpen: true,
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
    }

    sidebarContent(){
        return(
            <Fragment>
                <b>Sidebar content</b>
                <ul>
                    <li> <LinkContainer 
                        className="myAdmin_sidenav_elem"
                        to="/"
                    >
                        <button><img src={ Logo } id="img_logo" alt="Modela" /> Home</button>
                    </LinkContainer> </li>
                
                    <li> <LinkContainer 
                        key="admin_dashboard" 
                        className="myAdmin_sidenav_elem"
                        to="/_admin/dashboard"
                    >
                        <button>Dashboard</button>
                    </LinkContainer> </li>
                    
                    <li> <LinkContainer 
                        key="admin_products"
                        className="myAdmin_sidenav_elem"
                        to="/_admin/products"
                    >
                        <button>Products</button>
                    </LinkContainer> </li>

                    <li> <LinkContainer 
                        key="admin_orders" 
                        className="myAdmin_sidenav_elem"
                        to="/_admin/orders"
                    >
                        <button>Orders</button>
                    </LinkContainer> </li>
                    
                    <li> <LinkContainer 
                        key="admin_lables"
                        className="myAdmin_sidenav_elem"
                        to="/_admin/lables"
                    >
                        <button>Lables</button>
                    </LinkContainer> </li>
                    
                    <LinkContainer 
                        key="admin_texts" 
                        className="myAdmin_sidenav_elem"
                        to="/_admin/texts"
                    >
                        <button>Texts</button>
                    </LinkContainer>

                    <LinkContainer 
                        key="admin_logout"
                        className="myAdmin_sidenav_elem"
                        to="/_admin/login"
                    >
                        <button>LOGOUT</button>
                    </LinkContainer>
                </ul>
                        
            </Fragment>
        )
    }
*/
    render() {        
        //console.log('admin navbar props:', this.props);
        // <img src={ Logo } id="img_logo" alt="Modela" />
        /*
        return(
           <Sidebar
                sidebar={ this.sidebarContent() }
                docked={ true }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
            >
                <button onClick={() => this.onSetSidebarOpen(true)}>
                    Open sidebar
                </button>
            </Sidebar>
        )
/*/
        return(     
            <Navbar expand="lg" fixed="top">

                <Navbar.Brand>
                    <LinkContainer to="/">
                        <img src={ Logo } id="img_logo" alt="Modela" />
                    </LinkContainer>               
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav" className="my_navbar_collapse">
                    <Nav className="mr-auto">

                        <LinkContainer key="admin_dashboard" to="/_admin/dashboard">
                            <Nav.Link className="my_navbar_elem">Dashboard</Nav.Link>
                        </LinkContainer>

                        <LinkContainer key="admin_products" to="/_admin/products">
                            <Nav.Link className="my_navbar_elem">Products</Nav.Link>
                        </LinkContainer>

                        <LinkContainer key="admin_orders" to="/_admin/orders">
                            <Nav.Link className="my_navbar_elem">Orders</Nav.Link>
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


/*    
    <LinkContainer key="admin_lables" to="/_admin/lables">
        <Nav.Link className="my_navbar_elem">Lables</Nav.Link>
    </LinkContainer>

    <LinkContainer key="admin_texts" to="/_admin/texts">
        <Nav.Link className="my_navbar_elem">Texts</Nav.Link>
    </LinkContainer>
*/