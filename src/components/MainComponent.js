import React, {useEffect, useContext} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import useKeyPress from '../shared/useKeyPress';
import MoviesComponent from './MoviesComponent';
import {filteredMovies, ContextApp, movieByTitle} from '../shared/reducer';
import MovieDetailsComponent from './MovieDetailsComponent';

const Main = () => {
    const {state, dispatch} = useContext(ContextApp);

    const setMenu = (data) => {
        let genres = [];

        data.forEach(movie => {
            genres = genres.concat(movie.genre_ids)
        });

        dispatch({type: 'saveGenres', payload: Array.from(new Set(genres))});
    }

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/bdiadiun/technical-assignments/main/movieDataCollection.json')
            .then(response => response.json())
            .then(data => {
                setMenu(data);
                dispatch({type: 'saveMovies', payload: data});
            });
    }, []);

    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const arrowLeftPressed = useKeyPress('ArrowLeft');
    const arrowRightPressed = useKeyPress('ArrowRight');
    const enterPressed = useKeyPress('Enter');
    //todo:B
    const bPressed = useKeyPress('b');

    useEffect(() => {
        if (arrowUpPressed) {
            dispatch({type: 'arrowUp'});
        }
    }, [arrowUpPressed]);

    useEffect(() => {
        if (arrowDownPressed) {
            dispatch({type: 'arrowDown'});
        }
    }, [arrowDownPressed]);

    useEffect(() => {
        if (arrowLeftPressed) {
            dispatch({type: 'arrowLeft'});
        }
    }, [arrowLeftPressed]);

    useEffect(() => {
        if (arrowRightPressed) {
            dispatch({type: 'arrowRight'});
        }
    }, [arrowRightPressed]);

    useEffect(() => {
        if (enterPressed) {
            dispatch({type: 'enter'});
        }
    }, [enterPressed]);

    useEffect(() => {
        if (bPressed) {
            dispatch({type: 'b'});
        }
    }, [bPressed]);

    return (
        <>
            <div className="wrapper">
                <Header/>
                <div className="d-flex">
                    <Menu
                        genres={state.genres}
                        activeIndex={state.menuPosition}
                        filter={state.movieFilter}
                    />
                    {
                        state.movieSelected
                            ?
                            // <div>test</div>
                            <MovieDetailsComponent movie={movieByTitle(state.movies, state.movieSelected)}/>
                            :
                            <MoviesComponent
                                movies={filteredMovies(state.movies, state.movieFilter)}
                                activeIndex={state.moviePosition}
                            />
                    }

                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Main;
