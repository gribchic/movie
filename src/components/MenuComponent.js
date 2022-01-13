import React from 'react';
import {NavLink} from 'react-router-dom';

const Menu = () => {
    return (
        <aside>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Active</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/family">fantasy</NavLink>
                </li>
            </ul>
        </aside>
    );
}

export default Menu;
