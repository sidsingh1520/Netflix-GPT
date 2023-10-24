import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
	const user = useSelector((store) => store.user);
	const gpt = useSelector((store) => store.gpt);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { uid, email, displayName, photoURL } = user;
				dispatch(
					addUser({
						uid: uid,
						email: email,
						displayName: displayName,
						photoURL: photoURL,
					})
				);
				navigate("/browse");
			} else {
				dispatch(removeUser());
				navigate("/");
			}
		});
		return () => unsubscribe();
	}, []);
	const handleSignout = () => {
		signOut(auth)
			.then(() => {})
			.catch((error) => {
				navigate("/error");
			});
	};
	const handleGptSearchClick = () => {
		dispatch(toggleGptSearchView());
	};

	const handleLanguage = (e) => {
		dispatch(changeLanguage(e.target.value));
	};

	return (
		<div className="absolute px-4 py-2 bg-gradient-to-b  from-black z-10 w-full flex flex-col justify-center md:flex-row justify-between">
			<img className=" w-44 mx-auto md:mx-0" src={LOGO} alt="Logo" />
			{user && (
				<div className="flex justify-evenly ">
					{gpt.showGptSearch && (
						<select
							className="p-1 bg-gray-900 text-white m-1 rounded-md"
							onChange={handleLanguage}
						>
							{SUPPORTED_LANGUAGES.map((lang) => (
								<option key={lang.identifier} value={lang.identifier}>
									{lang.name}
								</option>
							))}
						</select>
					)}
					<button
						className="font-bold md:my-2 text-white py-2 px-1 md:py-2  md:px-4 bg-purple-800 rounded-lg md:mx-4"
						onClick={handleGptSearchClick}
					>
						{gpt.showGptSearch ? "Homepage" : "GPT Search"}
					</button>
					<button
						onClick={handleSignout}
						className="font-bold md:my-2 text-white py-2 px-1 md:py-2  md:px-4 bg-red-700 rounded-lg"
					>
						Logout
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
