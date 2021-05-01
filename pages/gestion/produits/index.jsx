import React from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import ProduitsTable from "../../../components/Admin/ProduitsTable";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";
import useSWR from "swr";

const fetcher = (url) => api.get(url).then((res) => res.data.data);

const Produits = () => {
	const { isAuthenticatedAdmin } = useAuth();

	const { data: products } = useSWR("/product/all", fetcher);

	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						<ProduitsTable products={products} />
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Produits);
