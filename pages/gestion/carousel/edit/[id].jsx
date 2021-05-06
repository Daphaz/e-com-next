import React, { useState } from "react";
import styles from "../../../../styles/admin.module.scss";
import { RequireAuthentificationAdmin } from "../../../../auth/protectedRoutes";
import useAuth from "../../../../auth/context";
import api from "../../../../auth/axios";
import { formValid } from "../../../../helpers";
import Layout from "../../../../components/Admin/Layout";
import { Form, FormErrors, Input } from "../../../../components";
import Router from "next/router";

const EditCarousel = ({ carousel }) => {
	const { isAuthenticatedAdmin } = useAuth();
	const [state, setState] = useState({
		title: carousel.title,
		content: carousel.content,
		illustration: carousel.illustration,
		btn_title: carousel.btn_title,
		btn_url: carousel.btn_url,
		errors: {
			illustration: "",
			request: "",
		},
	});

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
				const { data } = await api.put(
					`/carousel/update/${carousel.id}`,
					formData
				);

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
							<h3>Modifier un produits</h3>
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
										handleChange={handleChange}>
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

export const getServerSideProps = RequireAuthentificationAdmin(
	async ({ query }) => {
		const { id } = query;
		const { data } = await api.get("/carousel", { params: { id } });
		if (data.status) {
			return {
				props: {
					carousel: data.data,
				},
			};
		}

		return {
			props: {},
		};
	}
);

export default EditCarousel;
