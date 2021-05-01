import React from "react";
import Layout from "../../components/Admin/Layout";
import styles from "../../styles/admin.module.scss";
import CarouselTable from "../../components/Admin/CarouselTable";
import { ProtectedRouteAdmin } from "../../auth/protectedRoutes";
import useAuth from "../../auth/context";

const Carousel = () => {
	const { isAuthenticatedAdmin } = useAuth();
	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						<CarouselTable />
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Carousel);
