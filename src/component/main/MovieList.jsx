import React from "react";
import Header from "../layout/Header";
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";
import { useState } from "react";
import { useSelector } from "react-redux";
import Empty from "./Empty";


const MovieList = () => {
    const navigate = useNavigate();
    const movieListData = useSelector((state) => state.movieReducer.movies);
    const [currentPage, setCurrentPage] = useState(1)
    const moviesPerPage = 8;
    const lastIndex = currentPage * moviesPerPage;
    const firstIndex = lastIndex - moviesPerPage;
    const movieData = movieListData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(movieListData.length / moviesPerPage);

    const handleAddMovie = () => {
        navigate("/createMovie");
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const handleNextBtn = () => {
        if(currentPage < totalPages){
            setCurrentPage((prev) => prev + 1);
        }
    }

    const handlePrevBtn = () => {
        if(currentPage > 1){
            setCurrentPage((prev) => prev - 1);
        }
    }

    const handlePageClick = (page) => {
        if(currentPage < totalPages){
            setCurrentPage(page);
        }
    }

    const handleEditMovie = (movieId) => {
        navigate(`/editMovie/${movieId}`);
    }

    return(
        <div className="page_outer">
            <div className="container_page">
                <div className="movie_list px-3 px-md-2">
                    {movieListData.length > 0 ?
                        <>
                            <Header handleAddMovie={() => handleAddMovie()} handleLogout={() => handleLogout()} />
                            <div className="movie_list_outer">
                                <div className="row">
                                    {movieData.map((movie) => (
                                        <div key={movie.id} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                                            <Movie movie={movie} handleEdit={() => handleEditMovie(movie.id)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="pagination_wrapper">
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                    <button className="btn_prev_next" onClick={() => handlePrevBtn()}>Prev</button>
                                    <div className="d-flex gap-3">
                                        {(currentPage === totalPages) &&
                                            <p className="page_no mb-0" onClick={() => handlePageClick(currentPage - 1)}>{currentPage - 1}</p>
                                        }
                                        <p className="page_no active mb-0">{currentPage}</p>
                                        {totalPages > 1 && (currentPage !== totalPages) &&
                                            <p className="page_no mb-0" onClick={() => handlePageClick(currentPage + 1)}>{currentPage + 1}</p>
                                        }
                                    </div>
                                    <button className="btn_prev_next" onClick={() => handleNextBtn()}>Next</button>
                                </div>
                            </div>
                        </>
                        :
                        <Empty handleBtnClick={() => handleAddMovie()} />
                    }

                </div>
            </div>
        </div>
    )
}


export default MovieList;