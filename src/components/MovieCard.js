import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
	if (!posterPath) return null;
	return (
		<div className="w-36 md:w-48 pr-4">
			<img
				className="hover:scale-110 transition duration-500 cursor-pointer object-cover"
				alt="poster_movie"
				src={IMG_CDN_URL + posterPath}
			/>
		</div>
	);
};

export default MovieCard;
