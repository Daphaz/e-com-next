import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import CategorieTable from "../../components/Admin/CategorieTable";
import { ProtectedRouteAdmin } from "../../auth/protectedRoutes";
import useAuth from "../../auth/context";

const Categories = () => {
	const { isAuthenticatedAdmin } = useAuth();
	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						<CategorieTable />
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Categories);
