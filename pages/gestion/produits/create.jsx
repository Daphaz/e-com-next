import React from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import useSWR from "swr";
import api from "../../../auth/axios";

const fetcher = (url) => api.get(url).then((res) => res.data.data);

const NewProduct = () => {
	const { data: category } = useSWR("/category/all", fetcher);

	console.log(category);

	return (
		<Layout>
			<div className={styles.admin__content}>
				<div className={styles.admin__containerForm}>
					<h3>Création d'un produits</h3>
					<div className={styles.admin__create}>
						<form className="form">
							<div className="form__control">
								<div className="form__group">
									<label htmlFor="name">Nom</label>
									<input type="text" name="name" id="name" />
								</div>
								<div className="form__group">
									<label htmlFor="slug">Slug</label>
									<input type="text" name="slug" id="slug" />
								</div>
							</div>
							<div className="form__group">
								<label htmlFor="illustration">Illustration</label>
								<input
									type="file"
									name="illustration"
									id="illustration"
									className="form__file"
								/>
							</div>
							<div className="form__group">
								<label htmlFor="subtitle">sous-titre</label>
								<input type="text" name="subtitle" id="subtitle" />
							</div>
							<div className="form__group">
								<label htmlFor="description">description</label>
								<textarea name="description" id="description"></textarea>
							</div>
							<div className="form__control">
								<div className="form__group">
									<label htmlFor="featured">en avant</label>
									<input type="checkbox" name="featured" id="featured" />
								</div>
								<div className="form__group ml">
									<label htmlFor="price">prix</label>
									<input type="number" step="0.01" name="price" id="price" />
								</div>
							</div>
							<div className="form__group">
								<label htmlFor="category">categorie</label>
								<select type="number" name="category" id="category">
									{category ? (
										category.map((cat) => <option value="0">test</option>)
									) : (
										<option value="none">pas de categorie</option>
									)}
								</select>
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
	);
};

export default NewProduct;
