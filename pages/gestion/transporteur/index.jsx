import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import TransportTable from "../../../components/Admin/TransportTable";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";

const Transports = () => {
	const { isAuthenticatedAdmin } = useAuth();
	const [carrier, setCarrier] = useState(null);

	async function loadCarrier() {
		setCarrier(null);
		try {
			const { data } = await api.get("/carrier/all");
			if (data.status) {
				setCarrier(data.data);
			} else {
				setCarrier([]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		loadCarrier();
	}, []);

	async function deleteCarrier(id) {
		try {
			const { data } = await api.delete("/carrier/delete", {
				data: { id },
			});

			if (data.status) {
				loadCarrier();
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
						{carrier && (
							<TransportTable carrier={carrier} deleteCarrier={deleteCarrier} />
						)}
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Transports);
