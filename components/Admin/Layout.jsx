import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "../../styles/admin.module.scss";

const Layout = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Sidebar styles={styles} />
			<div className={styles.admin__row}>
				<Header styles={styles} />
				<main className={styles.admin__main}>{children}</main>
			</div>
		</div>
	);
};

export default Layout;
