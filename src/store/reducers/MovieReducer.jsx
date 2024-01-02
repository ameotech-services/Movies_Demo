
const initialState = {
    movies: []
}


export const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_MOVIE_LIST":
            return{
                ...state,
                movies: action.payload
            };
        case "ADD_NEW_MOVIE":
            let initialMovieList = [...state.movies, action.payload];
            return{
                ...state,
                movies: initialMovieList
            };
        case "EDIT_MOVIE":
            let movieList = [...state.movies];
            let index = movieList.findIndex((item) => item.id === Number(action.payload.id));
            if(index !== -1) {
                movieList[index] = action.payload
            }
            return{
                ...state,
                movies: movieList
            };
        default:
            return state;
    }
}