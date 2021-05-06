import React, { useState } from "react";
import styles from "../../../styles/admin.module.scss";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";
import { formValid } from "../../../helpers";
import Layout from "../../../components/Admin/Layout";
import { Form, FormErrors, Input } from "../../../components";
import Router from "next/router";

const initialState = {
	title: "",
	content: "",
	illustration: "",
	btn_title: "",
	btn_url: "",
	errors: {
		request: "",
		illustration: "",
	},
};

const NewCarousel = () => {
	const { isAuthenticatedAdmin } = useAuth();
	const [state, setState] = useState(initialState);

	function handleChange(e) {
		const target = e.target;
		const name = target.name;
		const value = target.type === "file" ? target.files[0] : target.value;
		let errors = { ...state.errors };

		switch (name) {
			case "illustration":
				if (value.type === "image/jpeg" || value.type === "image/png") {
					errors.illustration = "";
				} else {
					errors.illustration = "le fichier doit être une image";
				}
				break;

			default:
				break;
		}

		setState({ ...state, errors, [name]: value });
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			const formData = new FormData();
			const { errors, ...inputs } = state;

			for (let input in inputs) {
				formData.append(input, state[input]);
			}

			try {
				const { data } = await api.post("/carousel/create", formData);

				if (data.status) {
					Router.push("/gestion/carousel");
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					errors: { ...state.errors, [type]: message },
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
							<h3>Création d'une slide</h3>
							<div className={styles.admin__create}>
								<Form onSubmit={onSubmit}>
									<Input
										type="text"
										name="title"
										label="Titre"
										value={state.title}
										handleChange={handleChange}
									/>
									<Input
										type="textarea"
										name="content"
										label="Description"
										value={state.content}
										handleChange={handleChange}
									/>
									<Input
										type="file"
										name="illustration"
										label="Illustration"
										handleChange={handleChange}
										required>
										{state.errors.illustration.length > 0 && (
											<FormErrors error={state.errors.illustration} />
										)}
									</Input>
									<div className="form__control">
										<Input
											type="text"
											name="btn_title"
											label="bouton titre"
											value={state.btn_title}
											handleChange={handleChange}
										/>
										<Input
											type="text"
											name="btn_url"
											label="bouton url"
											value={state.btn_url}
											handleChange={handleChange}>
											{state.errors.request.length > 0 && (
												<FormErrors error={state.errors.request} />
											)}
										</Input>
									</div>
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

export default ProtectedRouteAdmin(NewCarousel);
