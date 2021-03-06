import React, { useState } from "react";
import styles from "../../../../styles/admin.module.scss";
import { RequireAuthentificationAdmin } from "../../../../auth/protectedRoutes";
import useAuth from "../../../../auth/context";
import useSWR from "swr";
import api from "../../../../auth/axios";
import { formValid, slugify } from "../../../../helpers";
import Layout from "../../../../components/Admin/Layout";
import OptionCategory from "../../../../components/Admin/OptionCategory";
import { Form, FormErrors, Input } from "../../../../components";
import Router from "next/router";

const fetcher = (url) => api.get(url).then((res) => res.data.data);

const EditProduct = ({ product }) => {
	const { isAuthenticatedAdmin } = useAuth();
	const [state, setState] = useState({
		name: product.name,
		slug: product.slug,
		illustration: product.illustration,
		subtitle: product.subtitle,
		description: product.subtitle,
		featured: product.isBest == 1 ? true : false,
		price: parseFloat(product.price),
		category: product.category,
		errors: {
			name: "",
			illustration: "",
			category: "",
		},
	});
	const { data: category } = useSWR("/category/all", fetcher);

	function handleChange(e) {
		const target = e.target;
		const name = target.name;
		const value =
			target.type === "checkbox"
				? target.checked
				: target.type === "file"
				? target.files[0]
				: target.value;
		let errors = { ...state.errors };
		let slug = "";

		switch (name) {
			case "name":
				if (value !== "") {
					errors.name = "";
					slug = slugify(value);
				} else {
					errors.name = "Vous devez rentrez un nom";
				}
				break;
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

		if (name === "name") {
			setState({ ...state, errors, [name]: value, slug });
		} else {
			setState({ ...state, errors, [name]: value });
		}
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
					`/product/update/${product.id}`,
					formData
				);

				if (data.status) {
					Router.push("/gestion/produits");
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					[type !== "request" ? type : "category"]: "",
					errors: { ...state.errors, [type || "category"]: message },
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
							<h3>Modifier un produits</h3>
							<div className={styles.admin__create}>
								<Form onSubmit={onSubmit}>
									<div className="form__control">
										<Input
											type="text"
											name="name"
											label="Nom"
											value={state.name}
											handleChange={handleChange}>
											{state.errors.name.length > 0 && (
												<FormErrors error={state.errors.name} />
											)}
										</Input>
										<Input
											type="text"
											name="slug"
											label="Slug"
											value={state.slug}
											handleChange={handleChange}
										/>
									</div>
									<Input
										type="file"
										name="illustration"
										label="Illustration"
										handleChange={handleChange}>
										{state.errors.illustration.length > 0 && (
											<FormErrors error={state.errors.illustration} />
										)}
									</Input>
									<Input
										type="text"
										name="subtitle"
										label="sous-titre"
										value={state.subtitle}
										handleChange={handleChange}
										required
									/>
									<Input
										type="textarea"
										name="description"
										label="description"
										value={state.description}
										handleChange={handleChange}
										required
									/>
									<div className="form__control">
										<Input
											type="checkbox"
											name="featured"
											label="en avant"
											checked={state.featured}
											handleChange={handleChange}
										/>
										<Input
											type="number"
											name="price"
											label="prix"
											value={state.price}
											handleChange={handleChange}
											ml
											required
										/>
									</div>
									<Input
										type="select"
										name="category"
										label="categorie"
										Options={<OptionCategory category={category} />}
										handleChange={handleChange}
										defaultOption="choisir une categorie"
										required>
										{state.errors.category.length > 0 && (
											<FormErrors error={state.errors.category} />
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
		const { data } = await api.get(`/product/edit/${id}`);
		if (data.status) {
			return {
				props: {
					product: data.data,
				},
			};
		}

		return {
			props: {},
		};
	}
);

export default EditProduct;
