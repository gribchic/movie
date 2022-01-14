import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faPlay, faBars} from '@fortawesome/free-solid-svg-icons'

const InfoItem = ({movie, title}) => {
    return (
        <div className="col-md">
            <header className="text-uppercase">
                {title}
            </header>
            <div>
                {movie.release_date}
            </div>
        </div>
    );
}

const MovieDetailsComponent = ({movie}) => {

    return (
        <main className="container-fluid">
            <div className="container">
                <h1 className="mb-5">{movie.title}</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row mb-4">
                            <InfoItem movie={movie} title={'Release'}/>
                        </div>
                        <div className="row">
                            <div className="col-10">
                                <img
                                    src={movie.poster_path}
                                    alt={movie.title}
                                    className="d-block w-50 m-auto"
                                />
                            </div>
                            <div className="row my-4">
                                <div className="col-md col-10">
                                    <button className="btn w-100 btn-primary">
                                        <FontAwesomeIcon icon={faPlay} className="me-2"/>
                                        Play
                                    </button>
                                </div>
                                <div className="col-md col-10">
                                    <button className="btn w-100">
                                        <FontAwesomeIcon icon={faEye} className="me-2"/>Trailer
                                    </button>
                                </div>
                                <div className="col-md col-10">
                                    <button className="btn w-100">
                                        <FontAwesomeIcon icon={faBars} className="me-2"/>List
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        {movie.overview}
                    </div>
                </div>
            </div>

        </main>
    );
};

export default MovieDetailsComponent;
