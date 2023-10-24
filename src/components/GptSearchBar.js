import React, { useRef, useState } from "react";
import { lang } from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import Loading from "./Loading";

const GptSearchBar = () => {
	const langKey = useSelector((store) => store.config.lang);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const searchText = useRef(null);
	const searchMovieTMDB = async (movieName) => {
		const movieData = await fetch(
			"https://api.themoviedb.org/3/search/movie?query=" +
				movieName +
				"&include_adult=false&page=1",
			API_OPTIONS
		);
		const json = await movieData.json();
		return json.results;
	};
	const handleGptSearchClick = async () => {
		setLoading(true);
		const gptQuery =
			"Act as a Movie Recommendation System and suggest some movies for the query : " +
			searchText.current.value +
			", only give me names of top 5 movies, comma separated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

		const gptResults = await openai.chat.completions.create({
			messages: [{ role: "user", content: gptQuery }],
			model: "gpt-3.5-turbo",
		});
		if (!gptResults.choices) {
			setError("Something went Wrong! Please try again later");
		}
		if (gptResults.choices) {
			const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
			const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
			const tmdbResults = await Promise.all(promiseArray);
			dispatch(
				addGptMovieResult({ movieResults: tmdbResults, movieNames: gptMovies })
			);
		}
		setLoading(false);
	};
	return (
		<div className="pt-[50%] md:pt-[10%] flex justify-center ">
			<form
				className="w-full md:w-1/2  grid grid-cols-12 rounded-lg"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					ref={searchText}
					className="p-4 m-4 col-span-8 rounded-lg"
					type="text"
					placeholder={lang[langKey].placeholderSearchText}
				/>
				<button
					className="col-span-3 my-4 px-4 md:m-4 bg-red-700 text-white rounded-lg"
					onClick={handleGptSearchClick}
				>
					{lang[langKey].search}
				</button>
				{loading && (
					<>
						<div className="col-span-5"></div>
						<div className="">
							<Loading />
						</div>
						<div className="col-span-5"></div>
					</>
				)}
				<p className="text-red-600 font-bold">{error}</p>
			</form>
		</div>
	);
};
export default GptSearchBar;
