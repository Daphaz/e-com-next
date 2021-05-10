import React, { useState } from "react";
import { ProtectedRoute } from "../../auth/protectedRoutes";
import useAuth from "../../auth/context";
import { formValid } from "../../helpers";
import { Form, FormErrors, Input, Layout } from "../../components";
import api from "../../auth/axios";
import useAlert from "../../constants/alert";
import Router from "next/router";

const initialState = {
	password: "",
	password2: "",
	errors: {
		password: "",
		request: "",
	},
};

const ResetPassword = () => {
	const { setAlertState } = useAlert();
	const [state, setState] = useState(initialState);
	const { isAuthenticated } = useAuth();

	function handleChange(e) {
		const { name, value } = e.target;
		let errors = { ...state.errors };

		switch (name) {
			case "password":
				errors.password = value.length > 5 ? "" : "mot de passe invalide";

			default:
				break;
		}

		setState({ ...state, errors, [name]: value });
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				const { password, password2 } = state;

				if (password !== password2) {
					return setState({
						...state,
						password2: "",
						errors: {
							...state.errors,
							password: "les mot de passe doivent être identique",
						},
					});
				}

				const { data } = await api.put("/user/modify-password", {
					password,
				});

				if (data.status) {
					setAlertState({
						close: true,
						title: "Mot de passe ",
						text: data.message,
						type: "sucess",
					});

					Router.push("/compte");
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					[type]: "",
					errors: { ...state.errors, [type]: message },
				});
			}
		} else {
			console.log("form invalid");
		}
	}
	return (
		<>
			{isAuthenticated && (
				<Layout>
					<section className="auth container">
						<Form onSubmit={onSubmit}>
							<h3 className="headline">Nouveau mot de passe</h3>
							<p className="headline_sub">
								Lorem ipsum dolor sit amet consectetur.
							</p>
							<Input
								type="password"
								name="password"
								label="Password"
								value={state.password}
								handleChange={handleChange}
								required>
								{state.errors.password.length > 0 && (
									<FormErrors error={state.errors.password} />
								)}
							</Input>
							<Input
								type="password"
								name="password2"
								label="Valider"
								value={state.password2}
								handleChange={handleChange}
								required>
								{state.errors.request.length > 0 && (
									<FormErrors error={state.errors.request} />
								)}
							</Input>
							<button type="submit" className="btn btn__primary">
								valider
							</button>
						</Form>
					</section>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRoute(ResetPassword);
