import React from 'react';

const ContextApp = React.createContext();

const container = {
    header: 0,
    menu: 1,
    content: 2,
    details: 3,
}

const initialState = {
    activeContainer: 0,
    genres: [],
    menuPosition: -1,
    movies: [],
    moviePosition: -1,
    movieSelected: null,
    movieFilter: null,
    btnIndex: 0,
    moviesLinks: []
}


const filteredMovies = (movies, filter) => {
    return filter
        ? movies.filter(movie => movie.genre_ids.indexOf(filter) > -1)
        : movies
}

const movieByTitle = (movies, title) => {
    return movies.filter(movie => movie.title === title)[0];
}

const reducer = (state, action) => {
    console.log(action, state);

    switch (action.type) {
        case 'arrowUp':
            if (state.activeContainer === container.header) {
                return {...state};
            }
            if (state.activeContainer === container.menu) {
                const menuPosition = state.menuPosition - 1;
                const activeContainer = menuPosition < 0
                    ? container.header
                    : container.menu;

                return {...state, activeContainer, menuPosition};
            }
            if (state.activeContainer === container.content) {

            }

            return {...state};
        case 'arrowDown':
            if (state.activeContainer === container.header) {
                return {...state, activeContainer: container.menu, menuPosition: 0};
            }
            if (state.activeContainer === container.menu) {
                let menuPosition = state.menuPosition === state.genres.length - 1
                    ? state.menuPosition
                    : state.menuPosition + 1;

                return {...state, menuPosition}
            }
            return {...state}
        case 'arrowLeft':
            return getArrowLeftState(state);
        case 'arrowRight':
            return getArrowRightState(state);
        case 'enter':
            return getEnterState(state);
        case 'b':
            return getBackState(state);
        case 'saveMovies':
            return {...state, movies: action.payload};
        case 'saveGenres':
            return {...state, genres: action.payload};
        case 'saveLinks':
            return {...state, moviesLinks: action.payload};
        default:
            //throw new Error();
            return {...state};
    }
}

function getBackState(state) {
    let newState;

    switch (state.activeContainer) {
        case container.details:
            newState = {
                ...state,
                movieSelected: null,
                activeContainer: container.content
            }
            focusOnLink(newState.moviesLinks, newState.moviePosition);
            break;
        default:
            newState = state;
            break;
    }

    return newState;
}

function getEnterState(state) {
    let newState;

    switch (state.activeContainer) {
        case container.header:
            newState = {
                ...state,
                movieFilter: null
            }
            break;
        case container.menu:
            newState = {
                ...state,
                movieFilter: state.genres[state.menuPosition]
            }
            break;
        case container.content:
            newState = {
                ...state,
                movieSelected: filteredMovies(state.movies, state.movieFilter)[state.moviePosition].title,
                activeContainer: container.details
            }
            break;
        default:
            newState = state;
            break;
    }

    return newState;
}

function getArrowRightState(state) {
    let newState;

    switch (state.activeContainer) {
        case container.menu:
            let links = document.querySelectorAll('a.movie-container');
            newState = {
                ...state,
                moviePosition: 0,
                activeContainer: container.content,
                moviesLinks: links
            }

            focusOnLink(newState.moviesLinks, newState.moviePosition);

            break;
        case container.content:
            newState = state.moviePosition === filteredMovies(state.movies, state.movieFilter).length - 1
                ? {...state}
                : {...state, moviePosition: state.moviePosition + 1}

            focusOnLink(newState.moviesLinks, newState.moviePosition);
            break;
        case container.details:
            newState = state.btnIndex === 2
                ? {...state, btnIndex: 0}
                : {...state, btnIndex: state.btnIndex + 1}
            break;
        default:
            newState = state;
            break;
    }

    return newState;
}

function getArrowLeftState(state) {
    let newState;

    switch (state.activeContainer) {
        case container.content:
            const moviePosition = state.moviePosition - 1;

            newState = state.moviePosition === 0
                ? {...state, activeContainer: container.menu, moviePosition}
                : {...state, moviePosition}

                if (moviePosition > -1) {
                    focusOnLink(newState.moviesLinks, newState.moviePosition);
                }
            break;
        case container.header:
        case container.menu:
        default:
            newState = {...state};
            break;
    }

    return newState;
}

function focusOnLink(links, index) {
    links[index].focus();
}

export {reducer, filteredMovies, initialState, ContextApp, movieByTitle};
