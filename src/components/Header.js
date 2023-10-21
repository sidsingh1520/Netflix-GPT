import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
	const user = useSelector((store) => store.user);
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

	return (
		<div className=" absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
			<img className=" w-44" src={LOGO} alt="Logo" />
			{user && (
				<div className="flex p-2">
					<img className="w-12 h-12" src={user?.photoURL} alt="" />
					<button onClick={handleSignout} className="font-bold text-white">
						(Sign Out)
					</button>
				</div>
			)}
		</div>
	);
};

export default Header;
