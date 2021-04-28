import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import CategorieTable from "../../components/Admin/CategorieTable";

const Categories = () => {
	return (
		<Layout>
			<div className={styles.admin__content}>
				<CategorieTable />
			</div>
		</Layout>
	);
};

export default Categories;
