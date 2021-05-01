import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import ClientsTable from "../../components/Admin/ClientsTable";
import { ProtectedRouteAdmin } from "../../auth/protectedRoutes";
import useAuth from "../../auth/context";

const Clients = () => {
	const { isAuthenticatedAdmin } = useAuth();
	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						<ClientsTable />
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Clients);
