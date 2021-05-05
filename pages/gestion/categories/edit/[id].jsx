import React, { useState } from "react";
import Layout from "../../../../components/Admin/Layout";
import styles from "../../../../styles/admin.module.scss";
import useAuth from "../../../../auth/context";
import api from "../../../../auth/axios";
import { formValid } from "../../../../helpers";
import { FormErrors, Form, Input } from "../../../../components";
import { useRouter } from "next/router";
import { RequireAuthentificationAdmin } from "../../../../auth/protectedRoutes";

const Edit = ({ category }) => {
	const { isAuthenticatedAdmin } = useAuth();
	const [state, setState] = useState({
		name: category.name || "",
		errors: {
			name: "",
		},
	});
	const router = useRouter();

	function handleChange(e) {
		const { name, value } = e.target;

		setState({ ...state, [name]: value });
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				const { name } = state;
				const { data } = await api.put(`/category/update/${category.id}`, {
					name,
				});

				if (data.status) {
					router.push("/gestion/categories");
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

export const getServerSideProps = RequireAuthentificationAdmin(
	async ({ query }) => {
		const { id } = query;
		const { data } = await api.get(`/category/edit/${id}`);
		if (data.status) {
			return {
				props: {
					category: data.data,
				},
			};
		}

		return {
			props: {},
		};
	}
);

export default Edit;
