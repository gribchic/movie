import React, {useEffect, useRef} from 'react';

const MovieItem = ({movie, focus}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (focus) {
            // Move element into view when it is focused
            ref.current.focus();
        } else {
            ref.current.blur()
        }
    }, [focus]);

    return (
        <div className="movie-container col-md-2 mb-3">
            <a href="#"
               className={`h-100 d-flex ${focus ? 'active' : ''}`}
               style={{
                   backgroundImage: `url(${movie.poster_path})`,
                   backgroundRepeat: 'no-repeat',
                   backgroundSize: 'cover',
                   backgroundPosition: '50% 50%'
               }}
               tabIndex={focus ? 0 : -1}
               ref={ref}
            />
        </div>
    );
}

const MoviesComponent = ({movies, activeIndex}) => {

    const movieRender = movies.map((movie, index) =>
        <MovieItem
            key={movie.title}
            focus={activeIndex === index}
            movie={movie}
        />
    )
    return (
        <main className="container-fluid">
            <div className="row">
                {movieRender}
            </div>
        </main>
    );
};

export default MoviesComponent;
