import React from "react";
import { useSelector } from "react-redux";
import useMovieVideo from "../hooks/useMovieVideo";
const MovieVideo = ({ movieId }) => {
	const trailerVideo = useSelector((store) => store.movies?.movieDetailVideo);
	useMovieVideo(movieId);
	return (
		<div className="w-screen">
			<iframe
				className="w-screen aspect-video"
				src={
					"https://www.youtube.com/embed/" +
					trailerVideo?.key +
					"?autoplay=1&mute=0"
				}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			></iframe>
		</div>
	);
};

export default MovieVideo;
