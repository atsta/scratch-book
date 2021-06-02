import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Navbar, Nav,NavItem} from  'react-bootstrap';
import SearchBar from './SearchBar/SearchBar.js';
import UserSection from './UserSection';
import './AppBar.scss';

const items = [
    { name: 'Home',  route: '/' },
    { name: 'About', route: '/about' },
    { name: 'FAQ',   route: '/faq' },
];

/**
 *
 */
export default withRouter(class AppBar extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        const { pathname: nextPathname, search: nextSearch, hash: nextHash } = nextProps.location,
            { pathname, search, hash } = this.props.location;

        return nextPathname !== pathname || nextSearch !== search || nextHash !== hash;
    }

    render() {

        const pathname = this.props.location.pathname;

        return (
            <div>
                {/* <div className={`${this.props.className} AppBar bg-dark text-white`}>
                    <div className="container d-flex justify-content-between align-items-stretch" style={{ height: 50 }}>
                        <div className="d-flex align-items-stretch">
                            <Link to={items[0].route} className="Logo d-flex align-items-center text-white pr-3">
                                <span className="fa fa-book-open fa-2x font-italic" />
                            </Link>
                            <nav className="ml-3 d-flex flex-row align-items-stretch">
                                {items.map((item, index) =>
                                    <Link key={index} to={item.route}
                                        className={`h-100 text-white text-center ${item.route === pathname ? 'selected' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </nav>
                        </div>
                        <UserSection />
                    </div>
                </div> */}
                
                    <Navbar className="AppBar" bg="dark" expand="sm" text="white">
                        <Navbar.Brand>
                            <Link to={items[0].route} className="Logo d-flex align-items-center text-white pr-3">
                                <span className="fa fa-book-open fa-2x font-italic" />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle variant="light" aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            
                            {/* {items.map((item, index) =>
                                <NavItem key={index}>
                                    <Link  to={item.route}
                                        className={`h-100 text-white text-center ${item.route === pathname ? 'selected' : ''}`}
                                    >
                                        {item.name}
                                    </Link>
                                </NavItem>
                                
                            )} */}
                             <NavItem>
                            <SearchBar />
                            </NavItem>
                            </Nav>
                            
                            <NavItem>
                                <UserSection />
                            </NavItem>
                        </Navbar.Collapse>
                    </Navbar>
                   
                
            </div>
            
        );
    }
});
