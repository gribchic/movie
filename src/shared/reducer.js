import React from 'react';
import {filteredMovies} from './helpers';

const ContextApp = React.createContext(null);

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
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'arrowUp':
            return getArrowUpState(state);
        case 'arrowDown':
            return getArrowDownState(state);
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
            return {...state};
    }
}

function getArrowDownState(state) {
    let newState;

    switch (state.activeContainer) {
        case container.header:
            newState = {...state, activeContainer: container.menu, menuPosition: 0};
            break;

        case container.menu:
            let menuPosition = state.menuPosition === state.genres.length - 1
                ? state.menuPosition
                : state.menuPosition + 1;
            newState = {...state, menuPosition}
            break;

        default:
            newState = {...state}
            break;
    }

    return newState;
}

function getArrowUpState(state) {
    let newState;

    switch (state.activeContainer) {
        case container.menu:
            const menuPosition = state.menuPosition - 1;
            const activeContainer = menuPosition < 0
                ? container.header
                : container.menu;

            newState = {...state, activeContainer, menuPosition};
            break;

        case container.header:
        default:
            newState = {...state};
            break;
    }

    return newState;
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

            newState = {
                ...state,
                moviePosition: 0,
                activeContainer: container.content,
            }
            break;

        case container.content:
            newState = state.moviePosition === filteredMovies(state.movies, state.movieFilter).length - 1
                ? {...state}
                : {...state, moviePosition: state.moviePosition + 1}
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
            break;

        case container.header:
        case container.menu:
        default:
            newState = {...state};
            break;
    }

    return newState;
}

export {reducer, initialState, ContextApp};
