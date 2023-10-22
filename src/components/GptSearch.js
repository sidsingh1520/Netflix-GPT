import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMG } from "../utils/constants";

const GptSearch = () => {
	return (
		<>
			<div className="fixed -z-10">
				<img
					className="h-screen object-cover md:w-screen"
					src={BACKGROUND_IMG}
					alt="Background Img"
				/>
			</div>
			<div className="">
				<GptSearchBar />
				<GptMovieSuggestions />
			</div>
		</>
	);
};

export default GptSearch;
