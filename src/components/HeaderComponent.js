import React, {useEffect, useRef} from 'react';

const Header = ({focus}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (focus) {
            ref.current.focus();
        } else {
            ref.current.blur()
        }
    }, [focus]);

    return (
        <nav className="navbar navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span
                    className="navbar-brand text-uppercase"
                    tabIndex={focus ? 0 : -1}
                    ref={ref}
                >
                    Filmer
                </span>
            </div>
        </nav>
    );
}

export default Header;
