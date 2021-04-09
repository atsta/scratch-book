import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const items = [
    { name: 'Home',  route: '/' },
    { name: 'About', route: '/about' },
    { name: 'FAQ',   route: '/faq' },
];

/**
 *
 */
export default class Navbar extends React.PureComponent {

    state = {
        selectedItem: items[0],
    };

    itemSelected = item => {

        this.setState({ selectedItem: item });
    };

    render() {

        return (
            <nav className={`${this.props.className} component-navbar bg-dark text-white list-unstyled d-flex
                justify-content-center align-items-stretch`}
                style={{ height: 50 }}
            >
                {items.map((item, index) =>
                    <Link key={index} to={item.route}
                        className={`h-100 text-white text-center ${item === this.state.selectedItem ? 'selected' : ''}`}
                        onClick={() => this.itemSelected(item)}
                    >
                        {item.name}
                    </Link>
                )}
            </nav>
        );
    }
};
