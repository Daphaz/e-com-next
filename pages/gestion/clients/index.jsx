import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/Layout";
import styles from "../../../styles/admin.module.scss";
import ClientsTable from "../../../components/Admin/ClientsTable";
import { ProtectedRouteAdmin } from "../../../auth/protectedRoutes";
import useAuth from "../../../auth/context";
import api from "../../../auth/axios";

const Clients = () => {
	const { isAuthenticatedAdmin } = useAuth();
	const [users, setUsers] = useState(null);

	async function loadUsers() {
		setUsers(null);
		try {
			const { data } = await api.get("/user/all");
			if (data.status) {
				setUsers(data.data);
			} else {
				setUsers([]);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		loadUsers();
	}, []);

	async function deleteUser(id) {
		try {
			const { data } = await api.delete("/user/delete", {
				data: { id },
			});

			if (data.status) {
				loadUsers();
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
						{users && <ClientsTable users={users} deleteUser={deleteUser} />}
					</div>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRouteAdmin(Clients);
