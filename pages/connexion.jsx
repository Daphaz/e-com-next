import React, { useState } from "react";
import useAuth from "../auth/context";
import { redirectFromServer } from "../auth/cookies";
import { formValid, handleChangeLogin } from "../helpers";
import { Form, FormErrors, Input, Layout, Alert } from "../components";
import useAlert from "../constants/alert";

const initialState = {
	email: "",
	password: "",
	errors: {
		email: "",
		password: "",
	},
	formIsValid: false,
};

const Login = () => {
	const [state, setState] = useState(initialState);
	const { alertState } = useAlert();
	const { login } = useAuth();

	async function formSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				await login(state.email, state.password);
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					[type || "email"]: "",
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
			{alertState.close && <Alert />}
			<section className="auth container">
				<Form onSubmit={formSubmit}>
					<h3 className="headline">Se connecter</h3>
					<p className="headline_sub">
						Lorem ipsum dolor sit amet consectetur.
					</p>
					<Input
						type="email"
						name="email"
						label="Email"
						value={state.email}
						handleChange={(e) => handleChangeLogin(e, state, setState)}
						required>
						{state.errors.email.length > 0 && (
							<FormErrors error={state.errors.email} />
						)}
					</Input>
					<Input
						type="password"
						name="password"
						label="password"
						value={state.password}
						handleChange={(e) => handleChangeLogin(e, state, setState)}
						required>
						{state.errors.password.length > 0 && (
							<FormErrors error={state.errors.password} />
						)}
					</Input>
					<button
						type="submit"
						className="btn btn__primary"
						disabled={!state.formIsValid}>
						connexion
					</button>
					<div className="form__links">
						<a href="/mot-de-passe-oublier" className="form__link">
							Mot de passe oublié ?
						</a>
						<a href="/inscription" className="form__link">
							Pas encore de compte ?
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

export default Login;
