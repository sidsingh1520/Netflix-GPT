export const checkValidData = (email, password) => {
	const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
		email
	);

	const isPasswordValid =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

	if (!isEmailValid) {
		return "Email format incorrect";
	}
	if (!isPasswordValid) {
		return "Password format incorrect(Min 8 characters with A-Z,a-z,special character)";
	}
	return null;
};
