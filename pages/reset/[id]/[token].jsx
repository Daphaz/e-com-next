import React, { useState } from "react";
import { redirectFromServer } from "../../../auth/cookies";
import { formValid } from "../../../helpers";
import { Form, FormErrors, Input, Layout } from "../../../components";
import api from "../../../auth/axios";

const initialState = {
	password: "",
	password2: "",
	errors: {
		password: "",
		request: "",
	},
};

const ResetPassword = ({ id, error }) => {
	const [state, setState] = useState(initialState);

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

				const { data } = await api.put(`/user/update/${id}`, {
					password,
				});

				if (data.status) {
					console.log(data.data);
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
		<Layout>
			<section className="auth container">
				{error ? (
					<div>
						<h4 className="headline">
							Votre lien à expiré il n'et valable que 1 heure aprés sa création.
						</h4>
						<p className="headline_sub">Veuillez recommencer la procedure</p>
						<a href="/mot-de-passe-oublier" className="btn btn__white">
							recommencer
						</a>
					</div>
				) : (
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
				)}
			</section>
		</Layout>
	);
};

export const getServerSideProps = async (context) => {
	redirectFromServer(context);
	const { id, token } = context.query;

	const { data } = await api.get(`/reset/${id}/${token}`);

	if (data.status) {
		return {
			props: {
				id,
			},
		};
	} else {
		return {
			props: {
				error: true,
			},
		};
	}
};

export default ResetPassword;
