import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import CarouselTable from "../../components/Admin/CarouselTable";

const Carousel = () => {
	return (
		<Layout>
			<div className={styles.admin__content}>
				<CarouselTable />
			</div>
		</Layout>
	);
};

export default Carousel;
