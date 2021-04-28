import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import Orders from "../../components/Admin/Orders";

const Commandes = () => {
	return (
		<Layout>
			<div className={styles.admin__content}>
				<Orders commandes footer />
			</div>
		</Layout>
	);
};

export default Commandes;
