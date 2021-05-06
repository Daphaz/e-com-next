import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import CarouselTable from "../../../components/Admin/CarouselTable";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";

const Carousel = () => {
	const [carousels, setCarousels] = useState(null);
	const { isAuthenticatedAdmin } = useAuth();

	async function loadCarousels() {
		setCarousels(null);
		try {
			const { data } = await api.get("/carousel/all");
			if (data.status) {
				setCarousels(data.data);
			} else {
				setCarousels([]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		loadCarousels();
	}, []);

	async function deleteCarousel(id) {
		try {
			const { data } = await api.delete("/carousel/delete", {
				data: { id },
			});

			if (data.status) {
				loadCarousels();
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			{isAuthenticatedAdmin && (
				<Layout>
					<div className={styles.admin__content}>
						{carousels && (
							<CarouselTable
								carousels={carousels}
								deleteCarousel={deleteCarousel}
							/>
						)}
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Carousel);
