import React, { useState } from "react";
import { redirectFromServer } from "../auth/cookies";
import { formValid } from "../helpers";
import { Form, FormErrors, Input, Layout } from "../components";
import api from "../auth/axios";
import Router from "next/router";

const initialState = {
	email: "",
	password: "",
	password2: "",
	firstname: "",
	lastname: "",
	errors: {
		email: "",
		password: "",
		firstname: "",
		lastname: "",
	},
};

const Register = () => {
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
					: "entrez un email valid";
				break;
			case "password":
				errors.password = value.length > 5 ? "" : "mot de passe invalid";

			default:
				break;
		}

		setState({ ...state, errors, [name]: value });
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				const { email, firstname, lastname, password, password2 } = state;

				if (password !== password2) {
					return setState({
						...state,
						errors: {
							...state.errors,
							password: "les mot de passe doivent être identique",
						},
					});
				}

				const { data } = await api.post("/auth/register", {
					email,
					firstname,
					lastname,
					password,
				});

				if (data.status) {
					Router.push("/connexion");
				}
			} catch (error) {
				console.log(error);
				const { type, message } = error.response.data;
				setState({
					...state,
					[type || "email"]: "",
					errors: { ...state.errors, [type || "email"]: message },
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
					<h3 className="headline">S'inscrire</h3>
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
					</Input>
					<div className="form__control">
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
							required
						/>
					</div>
					<Input
						type="text"
						name="firstname"
						label="Prénom"
						value={state.firstname}
						handleChange={handleChange}
						required
					/>
					<Input
						type="text"
						name="lastname"
						label="Nom"
						value={state.lastname}
						handleChange={handleChange}
						required
					/>
					<button type="submit" className="btn btn__primary">
						enregistrer
					</button>
					<a href="/connexion" className="form__link">
						Déjà un compte ?
					</a>
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

export default Register;
