import React, { useRef, useState } from "react";
import { lang } from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
	const langKey = useSelector((store) => store.config.lang);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const searchText = useRef(null);
	const handleGptSearchClick = async () => {
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

		const gptQuery =
			"Act as a Movie Recommendstion System and suggest some movies for the query : " +
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
			console.log(tmdbResults);
			dispatch(
				addGptMovieResult({ movieResults: tmdbResults, movieNames: gptMovies })
			);
		}
	};
	return (
		<div className="pt-[50%] md:pt-[10%] flex justify-center ">
			<form
				className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
				onSubmit={(e) => e.preventDefault()}
			>
				<input
					ref={searchText}
					className="p-4 m-4 col-span-9 rounded-lg"
					type="text"
					placeholder={lang[langKey].placeholderSearchText}
				/>
				<button
					className="col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg"
					onClick={handleGptSearchClick}
				>
					{lang[langKey].search}
				</button>
				<p className="text-red-600 font-bold">{error}</p>
			</form>
		</div>
	);
};
export default GptSearchBar;
