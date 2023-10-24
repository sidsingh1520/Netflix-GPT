import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG } from "../utils/constants";
import { USER_AVATAR } from "../utils/constants";
import Loading from "./Loading";

const Login = () => {
	const [isSignInForm, setIsSignInForm] = useState(true);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const email = useRef(null);
	const password = useRef(null);
	const name = useRef(null);
	const dispatch = useDispatch();

	const toggleSignInForm = () => {
		setErrorMessage(null);
		setIsSignInForm(!isSignInForm);
	};

	const handleButtonClick = () => {
		//validate the form data
		setLoading(true);
		const message = checkValidData(
			email.current.value,
			password.current.value,
			isSignInForm
		);
		setErrorMessage(message);
		if (message) {
			setLoading(false);
			return;
		}
		if (!isSignInForm) {
			//sign up logic
			createUserWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed up
					const user = userCredential.user;
					updateProfile(user, {
						displayName: name.current.value,
						photoURL: USER_AVATAR,
					})
						.then(() => {
							const { uid, email, displayName, photoURL } = auth.currentUser;
							// Profile updated!
							dispatch(
								addUser({
									uid: uid,
									email: email,
									displayName: displayName,
									photoURL: photoURL,
								})
							);
							setLoading(false);
						})
						.catch((error) => {
							setErrorMessage(error.message);
							setLoading(false);
						});
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorMessage);
					setLoading(false);
				});
		} else {
			setLoading(true);
			// sign in logic
			signInWithEmailAndPassword(
				auth,
				email.current.value,
				password.current.value
			)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					setLoading(false);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					setErrorMessage(errorMessage);
					setLoading(false);
				});
		}
	};

	return (
		<div>
			<Header />
			<div className="absolute">
				<img
					className="h-screen object-cover md:w-full md:h-auto"
					src={BACKGROUND_IMG}
					alt="Background Img"
				/>
			</div>
			<form
				onSubmit={(e) => e.preventDefault()}
				className="absolute p-12 w-10/12 md:w-3/12 bg-black mx-auto my-36 right-0 left-0 text-white bg-opacity-80 rounded-xl"
			>
				<h1 className="font-bold text-xl md:text-3xl py-4 ">
					{isSignInForm ? "Sign In" : "Sign Up"}
				</h1>
				<input
					ref={email}
					type="text"
					placeholder="Email Address"
					className="p-4 my-4 w-full bg-gray-800"
				/>
				{!isSignInForm && (
					<input
						ref={name}
						type="text"
						placeholder="Full Name"
						className="p-4 my-4 w-full bg-gray-800"
					/>
				)}
				<input
					ref={password}
					type="password"
					placeholder="Password"
					className="p-4 my-4 w-full bg-gray-800"
				/>
				{errorMessage && (
					<p className="text-red-500 font-bold text-sm py-2">{errorMessage}</p>
				)}
				<button
					className="p-4 my-4 bg-red-700 w-full rounded-lg"
					onClick={handleButtonClick}
				>
					{isSignInForm ? "Sign In" : "Sign Up"}
				</button>
				{loading && (
					<div className="flex justify-center">
						<Loading />
					</div>
				)}
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
