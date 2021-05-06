import React, { useState } from "react";
import Layout from "../../../../components/Admin/Layout";
import styles from "../../../../styles/admin.module.scss";
import useAuth from "../../../../auth/context";
import api from "../../../../auth/axios";
import { formValid } from "../../../../helpers";
import { FormErrors, Form, Input } from "../../../../components";
import { useRouter } from "next/router";
import { RequireAuthentificationAdmin } from "../../../../auth/protectedRoutes";

const Edit = ({ user }) => {
	const { isAuthenticatedAdmin } = useAuth();
	const [state, setState] = useState({
		email: user.email,
		password: "",
		password2: "",
		firstname: user.firstname,
		lastname: user.lastname,
		errors: {
			email: "",
			password: "",
			firstname: "",
			lastname: "",
		},
	});
	const router = useRouter();

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

				if (password !== "") {
					if (password !== password2) {
						return setState({
							...state,
							errors: {
								...state.errors,
								password: "les mot de passe doivent être identique",
							},
						});
					} else {
						const { data } = await api.put(`/user/update/${user.id}`, {
							email,
							firstname,
							lastname,
							password,
						});

						if (data.status) {
							router.push("/gestion/clients");
						}
					}
				}

				const { data } = await api.put(`/user/update/${user.id}`, {
					email,
					firstname,
					lastname,
				});

				if (data.status) {
					router.push("/gestion/clients");
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
							<h3>Modifier un client</h3>
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
											handleChange={handleChange}>
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

export const getServerSideProps = RequireAuthentificationAdmin(
	async ({ query }) => {
		const { id } = query;
		const { data } = await api.get(`/user/${id}`);
		if (data.status) {
			return {
				props: {
					user: data.data,
				},
			};
		}

		return {
			props: {},
		};
	}
);

export default Edit;
