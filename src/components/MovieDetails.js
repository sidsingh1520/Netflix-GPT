import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MovieVideo from "./MovieVideo";
import { useDispatch, useSelector } from "react-redux";
import {
	addMovieDetail,
	removeMovieDetail,
	removeMovieDetailVideo,
} from "../utils/moviesSlice";
import { API_OPTIONS, LOGO } from "../utils/constants";
import MovieCard from "./MovieCard";
const MovieDetails = () => {
	const movieId = useParams().movieId;
	const dispatch = useDispatch();
	const movie = useSelector((store) => store.movies.movieDetails);
	const fetchMovieDetails = async () => {
		const movieDetails = await fetch(
			"https://api.themoviedb.org/3/movie/" + movieId,
			API_OPTIONS
		);
		const json = await movieDetails.json();
		dispatch(addMovieDetail(json));
	};
	useEffect(() => {
		fetchMovieDetails();
		return () => {
			dispatch(removeMovieDetailVideo());
			dispatch(removeMovieDetail());
		};
	}, []);
	if (movie == null) return;

	return (
		<div className=" bg-black ">
			<Link to="/browse">
				<img
					className="md:absolute w-40 mx-auto md:mx-0"
					src={LOGO}
					alt="Logo"
				/>
			</Link>
			<MovieVideo movieId={movieId} />
			<div className=" md:w-[80%] md:mx-auto">
				<h1 className="my-4 font-bold text-2xl text-white">
					{movie?.title} ({movie?.release_date})
				</h1>
				<MovieCard posterPath={movie.poster_path} />
				<div className="my-4">
					{movie.genres.map((item) => (
						<span
							key={item.name}
							className=" bg-red-700 mr-1 py-2 px-3 text-lg rounded-md text-white"
						>
							{item.name}
						</span>
					))}
				</div>
				<p className="py-4 text-lg text-white">{movie?.overview}</p>
				<div>
					<h1 className="text-xl md:text-3xl py-4 text-white">
						Production Companies
					</h1>
					<div className="flex overflow-x-scroll">
						<div className="flex bg-white">
							{movie.production_companies.map((movie) => (
								<MovieCard key={movie.id} posterPath={movie.logo_path} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieDetails;
