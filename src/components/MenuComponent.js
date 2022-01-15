import React from 'react';

const Menu = ({genres, activeIndex, filter}) => {
    const links = genres.map((genre, index) =>
        <li className="nav-item" key={genre}>
            <a className={`nav-link ${activeIndex===index? 'hover':''} ${filter===genre? 'active':''}`} >{genre.charAt(0).toUpperCase() + genre.slice(1)}</a>
        </li>
    )
    return (
        <aside className="container-fluid p">
            <ul className="nav flex-column">
                {links}
            </ul>
        </aside>
    );
}

export default Menu;
