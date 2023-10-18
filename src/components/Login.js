import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);

	const toggleSignInForm = () => {
		setIsSignInForm(!isSignInForm);
	};

	return (
		<div>
			<Header />
			<div>
				<img
					className="absolute"
					src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1f-b6ad-0b5c8c2a20ef/IN-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg"
					alt="Background Img"
				/>
			</div>
			<form className="absolute p-12 w-3/12 bg-black mx-auto my-36 right-0 left-0 text-white bg-opacity-80 rounded-xl">
				<h1 className="font-bold text-3xl py-4 ">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>
				<input
					type="text"
					placeholder="Email Address"
					className="p-4 my-4 w-full bg-gray-800"
				/>
				{!isSignInForm && (
					<input
						type="text"
						placeholder="Full Name"
						className="p-4 my-4 w-full bg-gray-800"
					/>
				)}
				<input
					type="text"
					placeholder="Password"
					className="p-4 my-4 w-full bg-gray-800"
				/>
				<button className="p-4 my-4 bg-red-700 w-full rounded-lg">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</button>
				<p className="py-4" onClick={toggleSignInForm}>
					{isSignInForm
						? "New to Netflix? Sign Up Now"
						: "Already Registered? Sign In now."}
				</p>
			</form>
		</div>
	);
};

export default Login;
