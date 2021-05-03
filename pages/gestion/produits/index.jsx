import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import ProduitsTable from "../../../components/Admin/ProduitsTable";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";

const Produits = () => {
	const [products, setProducts] = useState(null);
	const { isAuthenticatedAdmin } = useAuth();

	async function loadProducts() {
		setProducts(null);
		try {
			const { data } = await api.get("/product/all");
			if (data.status) {
				setProducts(data.data);
			} else {
				setProducts([]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		loadProducts();
	}, []);

	async function deleteProduct(id) {
		try {
			const { data } = await api.delete("/product/delete", {
				data: { id },
			});

			if (data.status) {
				loadProducts();
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
						{products && (
							<ProduitsTable
								products={products}
								deleteProduct={deleteProduct}
							/>
						)}
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Produits);
