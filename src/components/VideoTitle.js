import React from "react";

const VideoTitle = ({ title, overview }) => {
	return (
		<div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
			<h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
			<p className="hidden md:inline-block py-6 text-lg w-4/12">{overview}</p>
			<div className="my-4 md:m-0">
				<button className="py-1 md:py-2 bg-white text-black text-lg  px-2 md:px-12 cursor-pointer rounded-md md:rounded-lg hover:bg-opacity-80">
					▶️ Play
				</button>
				<button className="hidden md:inline-block mx-2 py-2 bg-gray-200 text-lg px-12 rounded-lg bg-opacity-50">
					More Info
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
