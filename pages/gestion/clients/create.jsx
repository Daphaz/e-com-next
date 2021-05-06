import React, { useState } from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";
import { formValid } from "../../../helpers";
import { FormErrors, Form, Input } from "../../../components/";
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

const NewUser = () => {
	const { isAuthenticatedAdmin } = useAuth();
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

				const { data } = await api.post("/user/create", {
					email,
					firstname,
					lastname,
					password,
				});

				if (data.status) {
					Router.push("/gestion/clients");
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					[type || "email"]: "",
					errors: { ...state.errors, [type || "email"]: message },
				});
				if (error.response.statusCode === 401) {
					Router.push("/gestion");
				}
			}
		} else {
			console.log("form invalid");
		}
	}

	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						<div className={styles.admin__containerForm}>
							<h3>Création d'une client</h3>
							<div className={styles.admin__create}>
								<Form onSubmit={onSubmit}>
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
								</Form>
							</div>
						</div>
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(NewUser);
