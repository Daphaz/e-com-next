import React, { useState } from "react";
import { redirectFromServer } from "../auth/cookies";
import { formValid } from "../helpers";
import { Form, FormErrors, Input, Layout } from "../components";

const initialState = {
	email: "",
	errors: {
		email: "",
		request: "",
	},
	formIsValid: false,
};

const ForgotPassword = () => {
	const [state, setState] = useState(initialState);

	function handleChange(e) {
		const { name, value } = e.target;
		let errors = { ...state.errors };

		switch (name) {
			case "email":
				errors.email = value.match(
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
					? ""
					: "entrez un email valide";
				break;

			default:
				break;
		}

		if (errors.email === "") {
			setState({ ...state, errors, [name]: value, formIsValid: true });
		} else {
			setState({ ...state, errors, [name]: value, formIsValid: false });
		}
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				const { email } = state;

				const { data } = await api.post("/reset", {
					email,
				});

				if (data.status) {
					console.log(data.data);
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					email: "",
					errors: { ...state.errors, [type || "email"]: message },
					formIsValid: false,
				});
			}
		} else {
			console.log("form invalid");
		}
	}

	return (
		<Layout>
			<section className="auth container">
				<Form onSubmit={onSubmit}>
					<h3 className="headline">Mot de passe oublié</h3>
					<p className="headline_sub">
						Lorem ipsum dolor sit amet consectetur.
					</p>
					<Input
						type="email"
						name="email"
						label="Email"
						value={state.email}
						handleChange={handleChange}
						required>
						{state.errors.email.length > 0 && (
							<FormErrors error={state.errors.email} />
						)}
						{state.errors.request.length > 0 && (
							<FormErrors error={state.errors.request} />
						)}
					</Input>
					<button
						type="submit"
						className="btn btn__primary"
						disabled={!state.formIsValid}>
						valider
					</button>
					<div className="form__links">
						<a href="/connexion" className="form__link">
							se connecter ?
						</a>
						<a href="/inscription" className="form__link">
							s'inscrire ?
						</a>
					</div>
				</Form>
			</section>
		</Layout>
	);
};

export const getServerSideProps = async (context) => {
	redirectFromServer(context);

	return {
		props: {},
	};
};

export default ForgotPassword;
