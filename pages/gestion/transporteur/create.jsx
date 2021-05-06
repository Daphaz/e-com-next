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
	name: "",
	description: "",
	price: 0,
	errors: {
		price: "",
	},
};

const NewCarrier = () => {
	const { isAuthenticatedAdmin } = useAuth();
	const [state, setState] = useState(initialState);

	function handleChange(e) {
		const { name, value } = e.target;

		setState({ ...state, [name]: value });
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				const { name, description, price } = state;
				const { data } = await api.post("/carrier/create", {
					name,
					description,
					price,
				});

				if (data.status) {
					Router.push("/gestion/transporteur");
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					errors: { ...state.errors, [type || "price"]: message },
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
							<h3>Création d'un transport</h3>
							<div className={styles.admin__create}>
								<Form onSubmit={onSubmit}>
									<Input
										type="text"
										name="name"
										label="Nom"
										value={state.name}
										handleChange={handleChange}
										required
									/>
									<Input
										type="textarea"
										name="description"
										label="Description"
										value={state.description}
										handleChange={handleChange}
										required
									/>
									<Input
										type="number"
										name="price"
										label="Prix"
										handleChange={handleChange}
										required>
										{state.errors.price.length > 0 && (
											<FormErrors error={state.errors.price} />
										)}
									</Input>
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

export default ProtectedRouteAdmin(NewCarrier);
