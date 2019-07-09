/** [] Imported @ 
 * src/components/views/index.js
 * 
 * manualy updated 06/06/2019
*/ 

// [] fundemental components
    import React, { Component } from 'react'
    import { connect } from 'react-redux'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Nav, Navbar, NavDropdown } from "react-bootstrap"
    import { LinkContainer } from "react-router-bootstrap"
    import Select from 'react-select'
// [] my components
// [] my images
    import Logo from '../../../images/icons/icon-modela.png'
    import  { LanguageFlags } from './import_images' 

// -------------------------------------------------------------------------------

class Navigation extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,//{ value: 'eng', label: <span><img src={ LanguageFlags['eng-tiny.png'] } /> English</span> },
        };
    }  

    render() {
        //console.log('navbar props:', this.props);
        //console.log('Language : '+ this.props.prop_lang );

        const { selectedOption, prop_cart, prop_lang, prop_texts } = this.props; 

        /** [] language select  */
            // [] language options
                const langOptions = [
                    { value: 'eng', label: <span><img src={ LanguageFlags['eng-tiny.png'] } /> English</span> },
                    { value: 'rus', label: <span><img src={ LanguageFlags['rus-tiny.png'] } /> Русский</span> },
                    { value: 'lat', label: <span><img src={ LanguageFlags['lat-tiny.png'] } /> Latviešu</span> },
                ]; 
            // [] setting [lang_number], to define [defau;tValue] in [Select]
                let lang_number = 0;
                switch(prop_lang) {
                    case 'rus': lang_number = 1; break;
                    case 'lat': lang_number = 2; break;
                    default: lang_number = 0; break; // eng
                }
        /** */

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
                        {
                            prop_texts && prop_texts.map( elem => {
                                if( elem.Parent === '0'){
                                    return(
                                        <LinkContainer key={elem.ID_data} to={"/"+elem.Name}>
                                            <Nav.Link className="my_navbar_elem">{ elem[prop_lang.toUpperCase()] }</Nav.Link>
                                        </LinkContainer>
                                    ) // +prop_lang
                                } else if( elem.Parent === '1'){
                                    return(
                                        <NavDropdown className="my_navbar_drop" key={elem.ID_data} title={ elem[prop_lang.toUpperCase()] } id="basic-nav-dropdown">
                                        {
                                             prop_texts.map( innerElem => {
                                                 if( innerElem.Parent === elem.Name )
                                                    return(
                                                        <LinkContainer key={innerElem.ID_data} to={"/"+innerElem.Name}>
                                                            <Nav.Link className="my_navbar_dropElem">{ innerElem[prop_lang.toUpperCase()] }</Nav.Link>
                                                        </LinkContainer>
                                                    )
                                            })
                                        }
                                        </NavDropdown>
                                    )
                                } // [] end of [else]
                            })
                        }
                    </Nav>

                    <Nav className="mr-auto my_navbar_secound">
                        <Select
                            className = "basic-single my_nav_select"
                            classNamePrefix = "react-select"
                            isSearchable = { false }
                            name = "language"                            
                            options = { langOptions }  
                            value = { selectedOption } // []
                            defaultValue = { langOptions[lang_number] }
                            onChange = { (selectedOption) => {                                
                                this.setState({ selectedOption });
                                this.props.ChangeLanguge( selectedOption.value );
                            } }
                        />
                        
                        <LinkContainer to="/cart">
                            <Nav.Link className="my_navCart">
                                <i className="material-icons">shopping_cart</i>
                                {       
                                    prop_cart.length !== 0 ? (
                                        <span className="my_cartCount">{ prop_cart.length }</span>
                                    ) : ( null ) 
                                }                                
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        )
    }
}


const mapStateToProps = (state) => ({
    prop_cart: state.rootCart.redu_cartItems,
    prop_lang: state.rootLang.lang,
    prop_texts: state.rootStatic.navbar_data,
    //prop_lang_val: state.rootLang.value,
})
const mapDispatchToProps = (dispatch) => {
  return{
    ChangeLanguge: ( lang, lable ) => { 
        dispatch({
            type: 'CHANGE_LANG',
            payload: { lang, lable }
        }) 
    },
  }
}
Navigation.propTypes = {        
    selectedOption: PropTypes.any,

    prop_cart: PropTypes.any,
    prop_lang: PropTypes.any,
    prop_texts: PropTypes.any,

    ChangeLanguge: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Navigation)


/*
                      

                        <LinkContainer to="/store">
                            <Nav.Link>{}</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/services">
                            <Nav.Link>Services</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="Info" id="basic-nav-dropdown">
                            <LinkContainer to="/downloads">
                                <NavDropdown.Item>Downloads</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/special">
                                <NavDropdown.Item>Special</NavDropdown.Item>
                            </LinkContainer>  
                            <LinkContainer to="/trade">
                                <NavDropdown.Item>Trade info</NavDropdown.Item>
                            </LinkContainer>                       
                        </NavDropdown>

*/