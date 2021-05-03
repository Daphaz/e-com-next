import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import CategorieTable from "../../../components/Admin/CategorieTable";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";

const fetcher = (url) =>
	api
		.get(url)
		.then((res) => (res.data.data === undefined ? [] : res.data.data));

const Categories = () => {
	const [categories, setCategories] = useState(null);
	const { isAuthenticatedAdmin } = useAuth();

	async function loadCategories() {
		setCategories(null);
		try {
			const { data } = await api.get("/category/all");
			if (data.status) {
				setCategories(data.data);
			} else {
				setCategories([]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		loadCategories();
	}, []);

	async function deleteCategory(id) {
		try {
			const { data } = await api.delete("/category/delete", {
				data: { id },
			});

			if (data.status) {
				loadCategories();
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						{categories && (
							<CategorieTable
								categories={categories}
								deleteCategory={deleteCategory}
							/>
						)}
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Categories);
