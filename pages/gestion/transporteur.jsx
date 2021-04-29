import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import TransportTable from "../../components/Admin/TransportTable";

const Transports = () => {
	return (
		<Layout>
			<div className={styles.admin__content}>
				<TransportTable />
			</div>
		</Layout>
	);
};

export default Transports;
