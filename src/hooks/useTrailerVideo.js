import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const useTrailerVideo = (movieId) => {
	const dispatch = useDispatch();

	const getMovieVideos = async () => {
		const data = await fetch(
			"https://api.themoviedb.org/3/movie/" +
				movieId +
				"/videos?language=en-US",
			API_OPTIONS
		);
		const json = await data.json();
		const trailers = json.results.filter((item) => item.type === "Trailer");
		const trailer = trailers.length ? trailers[0] : json.results[0];
		dispatch(addTrailerVideo(trailer));
	};
	useEffect(() => {
		getMovieVideos();
	}, []);
};

export default useTrailerVideo;
