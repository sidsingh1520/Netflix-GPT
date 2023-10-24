import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
	name: "movies",
	initialState: {
		nowPlayingMovies: null,
		trailerVideo: null,
		popularMovies: null,
		topRatedMovies: null,
		upcomingMovies: null,
		movieDetailVideo: null,
		movieDetails: null,
	},
	reducers: {
		addNowPlayingMovies: (state, action) => {
			state.nowPlayingMovies = action.payload;
		},
		addTrailerVideo: (state, action) => {
			state.trailerVideo = action.payload;
		},
		addPopularMovies: (state, action) => {
			state.popularMovies = action.payload;
		},
		addTopRatedMovies: (state, action) => {
			state.topRatedMovies = action.payload;
		},
		addUpcomingMovies: (state, action) => {
			state.upcomingMovies = action.payload;
		},
		addMovieDetailVideo: (state, action) => {
			state.movieDetailVideo = action.payload;
		},
		removeMovieDetailVideo: (state, action) => {
			state.movieDetailVideo = null;
		},
		addMovieDetail: (state, action) => {
			state.movieDetails = action.payload;
		},
		removeMovieDetail: (state, action) => {
			state.movieDetails = null;
		},
	},
});

export const {
	addNowPlayingMovies,
	addTrailerVideo,
	addPopularMovies,
	addTopRatedMovies,
	addUpcomingMovies,
	addMovieDetailVideo,
	removeMovieDetailVideo,
	addMovieDetail,
	removeMovieDetail,
} = moviesSlice.actions;

export default moviesSlice.reducer;
