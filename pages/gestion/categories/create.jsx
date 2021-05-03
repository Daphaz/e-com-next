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
	errors: {
		name: "",
	},
};

const NewCategory = () => {
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
				const { name } = state;
				const { data } = await api.post("/category/create", { name });

				if (data.status) {
					Router.push("/gestion/categories");
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					[type || "name"]: "",
					errors: { ...state.errors, [type || "name"]: message },
				});
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
							<h3>Création d'une categorie</h3>
							<div className={styles.admin__create}>
								<Form onSubmit={onSubmit}>
									<Input
										type="text"
										name="name"
										label="Nom"
										value={state.name}
										handleChange={handleChange}
										required>
										{state.errors.name.length > 0 && (
											<FormErrors error={state.errors.name} />
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

export default ProtectedRouteAdmin(NewCategory);
