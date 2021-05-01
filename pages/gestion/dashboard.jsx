import React from "react";
import Layout from "../../components/Admin/Layout";
import ListWidgets from "../../components/Admin/ListWidgets";
import Orders from "../../components/Admin/Orders";
import styles from "../../styles/admin.module.scss";
import { ProtectedRouteAdmin } from "../../auth/protectedRoutes";
import useAuth from "../../auth/context";

const Dashboard = () => {
	const { isAuthenticatedAdmin } = useAuth();
	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<ListWidgets />
					<div className={styles.admin__content}>
						<Orders />
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Dashboard);
