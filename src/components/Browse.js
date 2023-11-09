import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import useOnlineStatus from "../utils/useOnlineStatus";
const Browse = () => {
	const gpt = useSelector((store) => store.gpt);
	useNowPlayingMovies();
	usePopularMovies();
	useUpcomingMovies();
	useTopRatedMovies();
	const onlineStatus = useOnlineStatus();
	if (onlineStatus === false) {
		return (
			<h1>Looks like you're offline!! Please check your internet connection</h1>
		);
	}
	return (
		<div>
			<Header />
			{gpt.showGptSearch ? (
				<GptSearch />
			) : (
				<>
					<MainContainer />
					<SecondaryContainer />
				</>
			)}
		</div>
	);
};

export default Browse;
