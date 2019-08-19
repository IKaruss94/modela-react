/** [] Imported @ 
 * src/components/views/index.js
 * 
 * manualy updated 06/06/2019
*/ 

// [] fundemental components
    import React, { Component } from "react"
    import { compose } from 'redux'
    import { connect } from 'react-redux'
    import PropTypes from 'prop-types'
    import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
    import { Nav, Navbar, NavDropdown } from "react-bootstrap"
    import { LinkContainer } from "react-router-bootstrap"
    import Select from 'react-select'
// [] my components
// [] my images
    import Logo from '../../../images/icons/icon-modela.png'
    import  { LanguageFlags } from '../functions/import_images' 

// -------------------------------------------------------------------------------

class Navigation extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: null,//{ value: 'ENG', label: <span><img src={ LanguageFlags['eng-tiny.png'] } /> English</span> },
        };
    }  

    
    render() {        
        //console.log('navbar props:', this.props);
        //console.log('Language : '+ this.props.prop_lang );

        const { selectedOption, prop_cart, prop_lang, prop_navbar } = this.props; 

        /** [] language select  */
            // [] language options
                const langOptions = [
                    { value: 'ENG', label: <span><img src={ LanguageFlags['eng-tiny.png'] } /> English</span> },
                    { value: 'RUS', label: <span><img src={ LanguageFlags['rus-tiny.png'] } /> Русский</span> },
                    { value: 'LAT', label: <span><img src={ LanguageFlags['lat-tiny.png'] } /> Latviešu</span> },
                ]; 
            // [] setting [lang_number], to define [defau;tValue] in [Select]
                let lang_number = 0;
                switch(prop_lang) {
                    case 'RUS': lang_number = 1; break;
                    case 'LAT': lang_number = 2; break;
                    default: lang_number = 0; break; // ENG
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
                            prop_navbar && prop_navbar.map( (elem, index) => {
                                if( elem.Parent === '0'){
                                    return(
                                        <LinkContainer key={ index } to={"/"+elem.Name}>
                                            <Nav.Link className="my_navbar_elem">{ elem[prop_lang] }</Nav.Link>
                                        </LinkContainer>
                                    ) // +prop_lang
                                } else if( elem.Parent === '1'){
                                    return(
                                        <NavDropdown className="my_navbar_drop" key={ index } title={ elem[prop_lang] } id="basic-nav-dropdown">
                                        {
                                             prop_navbar.map( (innerElem, index) => {
                                                 if( innerElem.Parent === elem.Name )
                                                    return(
                                                        <LinkContainer key={ index } to={"/"+innerElem.Name}>
                                                            <Nav.Link className="my_navbar_dropElem">{ innerElem[prop_lang] }</Nav.Link>
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
                                <div className="my_cartInside">
                                    
                                    <span className="my_cartIcon">
                                        <i className="material-icons">shopping_cart</i>
                                    </span>
                                    {       
                                        prop_cart.length !== 0 ? (
                                            <span className="my_cartCount">{ prop_cart.length }</span>
                                        ) : ( null ) 
                                    }              
                                </div>                  
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        )
    }
}


const mapStateToProps = (state) => ({
    prop_navbar: state.rootFirestore.ordered.navbar,

    prop_lang: state.rootLang.lang,
    prop_cart: state.rootCart.redu_cartItems,
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

    prop_navbar: PropTypes.any,
    prop_lang: PropTypes.any,
    prop_cart: PropTypes.any,

    ChangeLanguge: PropTypes.func,
}
export default  compose(
    connect( mapStateToProps, mapDispatchToProps ),
    firestoreConnect([
      { collection: 'navbar', orderBy: ['order_value'] }
    ])
  )(Navigation)