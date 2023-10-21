import React from "react";

const VideoTitle = ({ title, overview }) => {
	return (
		<div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
			<h1 className="text-6xl font-bold">{title}</h1>
			<p className="py-6 text-lg w-4/12">{overview}</p>
			<div>
				<button className="py-2 bg-white text-black text-lg px-12 cursor-pointer rounded-lg hover:bg-opacity-80">
					▶️ Play
				</button>
				<button className="mx-2 py-2 bg-gray-200 text-lg px-12 rounded-lg bg-opacity-50">
					More Info
				</button>
			</div>
		</div>
	);
};

export default VideoTitle;
