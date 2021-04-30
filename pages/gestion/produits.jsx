import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import ProduitsTable from "../../components/Admin/ProduitsTable";

const Produits = () => {
	return (
		<Layout>
			<div className={styles.admin__content}>
				<ProduitsTable />
			</div>
		</Layout>
	);
};

export default Produits;
