export const getMovieList = (val) => ({
    type: "GET_MOVIE_LIST",
    payload: val,
});

export const addNewMovie = (val) => ({
    type: "ADD_NEW_MOVIE",
    payload: val,
});

export const editMovie = (val) => ({
    type: "EDIT_MOVIE",
    payload: val,
});