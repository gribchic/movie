import React from 'react';

const MoviesComponent = ({movies, activeIndex}) => {

    const movieRender = movies.map((movie, index) =>
        <div className="col-md-2 mb-3 "
             key={movie.title}>
            <a href="#"
               className={`movie-container h-100 d-flex ${activeIndex === index ? 'active' : ''}`}
               style={{
                   backgroundImage: `url(${movie.poster_path})`,
                   backgroundRepeat: 'no-repeat',
                   backgroundSize: 'cover',
                   backgroundPosition: '50% 50%'
               }}>
                <img
                    src={movie.poster_path}
                    alt={movie.title}
                    className="img-fluid w-100"
                    style={{
                        opacity: 0
                    }}
                />
            </a>
        </div>
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
