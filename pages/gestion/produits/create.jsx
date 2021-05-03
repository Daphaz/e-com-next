import React, { useState } from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import useSWR from "swr";
import api from "../../../auth/axios";
import { formValid, slugify } from "../../../helpers";
import FormErrors from "../../../components/FormErrors";
import Router from "next/router";

const initialState = {
	name: "",
	slug: "",
	illustration: "",
	subtitle: "",
	description: "",
	featured: false,
	price: 0,
	category: "",
	errors: {
		name: "",
		illustration: "",
		category: "",
	},
};

const fetcher = (url) => api.get(url).then((res) => res.data.data);

const NewProduct = () => {
	const { isAuthenticatedAdmin } = useAuth();
	const [state, setState] = useState(initialState);
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
				const { data } = await api.post("/product/create", formData);

				if (data.status) {
					Router.push("/gestion/produits");
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					[type || "category"]: "",
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
							<h3>Création d'un produits</h3>
							<div className={styles.admin__create}>
								<form className="form" onSubmit={onSubmit}>
									<div className="form__control">
										<div className="form__group">
											<label htmlFor="name">Nom</label>
											<input
												type="text"
												name="name"
												id="name"
												onChange={handleChange}
											/>
											{state.errors.name.length > 0 && (
												<FormErrors error={state.errors.name} />
											)}
										</div>
										<div className="form__group">
											<label htmlFor="slug">Slug</label>
											<input
												type="text"
												name="slug"
												id="slug"
												value={state.slug}
												disabled
											/>
										</div>
									</div>
									<div className="form__group">
										<label htmlFor="illustration">Illustration</label>
										<input
											type="file"
											name="illustration"
											id="illustration"
											className="form__file"
											onChange={handleChange}
										/>
										{state.errors.illustration.length > 0 && (
											<FormErrors error={state.errors.illustration} />
										)}
									</div>
									<div className="form__group">
										<label htmlFor="subtitle">sous-titre</label>
										<input
											type="text"
											name="subtitle"
											id="subtitle"
											onChange={handleChange}
											required
										/>
									</div>
									<div className="form__group">
										<label htmlFor="description">description</label>
										<textarea
											name="description"
											id="description"
											onChange={handleChange}
											required></textarea>
									</div>
									<div className="form__control">
										<div className="form__group">
											<label htmlFor="featured">en avant</label>
											<input
												type="checkbox"
												name="featured"
												id="featured"
												checked={state.featured}
												onChange={handleChange}
											/>
										</div>
										<div className="form__group ml">
											<label htmlFor="price">prix</label>
											<input
												type="number"
												step="0.01"
												name="price"
												id="price"
												onChange={handleChange}
												required
											/>
										</div>
									</div>
									<div className="form__group">
										<label htmlFor="category">categorie</label>
										<select
											type="number"
											name="category"
											id="category"
											onChange={handleChange}>
											<option value="none">choisir une categorie</option>
											{category &&
												category.map((cat) => (
													<option value={cat.name} key={cat.id}>
														{cat.name}
													</option>
												))}
										</select>
										{state.errors.category.length > 0 && (
											<FormErrors error={state.errors.category} />
										)}
									</div>
									<div className="form__group">
										<button type="submit" className="btn btn__primary">
											enregistrer
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(NewProduct);
