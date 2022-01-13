import React from 'react';

const MoviesComponent = ({movies}) => {

    const movieRender = movies.map((movie) =>
        <a href="#" key={movie.title} className="col-md-2 mb-3" style={{
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
