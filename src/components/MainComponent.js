import React, {useState, useEffect} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import MoviesComponent from './MoviesComponent';
import {Routes, Route, useParams} from 'react-router-dom';

const Main = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/bdiadiun/technical-assignments/main/movieDataCollection.json')
            .then(response => response.json())
            .then(data => setMovies(data));
    }, []);

    const MoviesByGenre = () => {
        let params= useParams();
        return (
            <MoviesComponent movies={movies.filter(movie=>movie.genre_ids.indexOf(params.gender)>-1)}/>
        );
    }

    return (
        <>
            <div className="wrapper">
                <Header/>
                <div className="d-flex">
                    <Menu/>
                    <Routes>
                        <Route path="/" element={<MoviesComponent movies={movies}/>}/>
                        <Route path="/:gender" element={<MoviesByGenre/>}/>
                    </Routes>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Main;
