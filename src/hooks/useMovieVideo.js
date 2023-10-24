import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieDetailVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieVideo = (movieId) => {
	const dispatch = useDispatch();
	const getMovieVideos = async (movieId) => {
		const data = await fetch(
			"https://api.themoviedb.org/3/movie/" +
				movieId +
				"/videos?language=en-US",
			API_OPTIONS
		);
		const json = await data.json();
		console.log(json);
		const trailers = json.results?.filter((item) => item.type === "Trailer");
		const video = trailers?.length ? trailers[0] : json.results[0];
		dispatch(addMovieDetailVideo(video));
	};
	useEffect(() => {
		getMovieVideos(movieId);
	}, []);
};

export default useMovieVideo;
