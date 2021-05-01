// valid form
function formValid({ errors, ...rest }) {
	let isValid = false;

	Object.values(errors).forEach((val) => {
		if (val.length > 0) {
			isValid = false;
		} else {
			isValid = true;
		}
	});

	Object.values(rest).forEach((val) => {
		if (val === null) {
			isValid = false;
		} else {
			isValid = true;
		}
	});

	return isValid;
}

//handleChange Login
function handleChangeLogin(e) {
	e.preventDefault();
	const { name, value } = e.target;
	let errors = { ...state.errors };

	switch (name) {
		case "email":
			errors.email = value.match(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
				? ""
				: "entrez un email valid";
			break;
		case "password":
			errors.password = value.length > 5 ? "" : "mot de passe invalid";

		default:
			break;
	}

	if (errors.email === "" && errors.password === "") {
		if (state.password === "") {
			setState({ ...state, errors, [name]: value, formIsValid: false });
		} else {
			setState({ ...state, errors, [name]: value, formIsValid: true });
		}
	} else {
		setState({ ...state, errors, [name]: value, formIsValid: false });
	}
}

export { formValid, handleChangeLogin };
