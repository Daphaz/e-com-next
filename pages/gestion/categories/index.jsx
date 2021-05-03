import React from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import CategorieTable from "../../../components/Admin/CategorieTable";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";
import useSWR from "swr";

const fetcher = (url) =>
	api
		.get(url)
		.then((res) => (res.data.data === undefined ? [] : res.data.data));

const Categories = () => {
	const { isAuthenticatedAdmin } = useAuth();

	const { data: categories } = useSWR("/category/all", fetcher);

	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						{categories && <CategorieTable categories={categories} />}
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Categories);
