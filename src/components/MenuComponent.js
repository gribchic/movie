import React, {useRef, useEffect} from 'react';

function MenuItem({genre, filter, focus}) {
    const ref = useRef(null);

    function upperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(() => {
        if (focus) {
            ref.current.focus();
        } else {
            ref.current.blur()
        }
    }, [focus]);

    return (
        <li
            className="nav-item"
        >
            <a
                tabIndex={focus ? 0 : -1}
                ref={ref}
                className={`nav-link ${focus ? 'hover' : ''} ${filter === genre ? 'active' : ''}`}
            >
                {upperFirstLetter(genre)}
            </a>
        </li>
    );
}

const Menu = ({genres, activeIndex, filter}) => {
    const links = genres.map((genre, index) =>
            <MenuItem
                key={genre}
                focus={activeIndex === index}
                genre={genre}
                filter={filter}
            />
    )
    return (
        <aside
            className='container-fluid p'>
            <ul className='nav flex-column'>
                {links}
            </ul>
        </aside>
    );
}

export default Menu;
