import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import ClientsTable from "../../components/Admin/ClientsTable";

const Clients = () => {
	return (
		<Layout>
			<div className={styles.admin__content}>
				<ClientsTable />
			</div>
		</Layout>
	);
};

export default Clients;
