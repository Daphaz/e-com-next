import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import Orders from "../../components/Admin/Orders";
import { ProtectedRouteAdmin } from "../../auth/protectedRoutes";
import useAuth from "../../auth/context";

const Commandes = () => {
	const { isAuthenticatedAdmin } = useAuth();
	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						<Orders commandes footer />
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Commandes);
