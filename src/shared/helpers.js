
const filteredMovies = (movies, filter) => {
    return filter
        ? movies.filter(movie => movie.genre_ids.indexOf(filter) > -1)
        : movies
}

const movieByTitle = (movies, title) => {
    return movies.filter(movie => movie.title === title)[0];
}

export {filteredMovies, movieByTitle};
