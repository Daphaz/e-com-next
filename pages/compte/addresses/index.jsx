import React, { useState, useEffect } from "react";
import IconPlus from "../../../public/icons/icon-add.svg";
import api from "../../../auth/axios";
import useAuth from "../../../auth/context";
import { ProtectedRoute } from "../../../auth/protectedRoutes";
import { CardAddress, Layout } from "../../../components";
import Router from "next/router";

const Addresses = () => {
	const [addresses, setAddresses] = useState(null);
	const { isAuthenticated, user } = useAuth();
	const [toggle, setToggle] = useState(false);

	const loadAdresses = async () => {
		setAddresses(null);
		try {
			const { data } = await api.get("/address/all", {
				params: { userId: user.id },
			});

			if (data.status) {
				setAddresses(data.data);
			} else {
				setAddresses([]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) loadAdresses();
	}, [isAuthenticated, toggle]);

	async function handleDelete(id) {
		setToggle(!toggle);
		try {
			const { data } = await api.delete("/address/delete", {
				data: {
					id,
					userId: user.id,
				},
			});

			if (data.status) {
				Router.push("/compte/addresses");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<section className="account container">
						<h1 className="h1">Mes Addresses</h1>
						<div className="account_row">
							<div className="account_subtitle">
								<p>
									C'est dans cet espace que vous allez pouvoir gérer toutes vos
									addresses.
								</p>
							</div>
							<div className="account_add">
								<a href="/compte/addresses/create" className="btn btn__create">
									<IconPlus />
									Ajouter
								</a>
							</div>
						</div>
						{addresses && addresses.length > 0 ? (
							<div className="account_cards">
								{addresses.map((address) => (
									<CardAddress
										address={address}
										key={address.id}
										handleDelete={handleDelete}
									/>
								))}
							</div>
						) : (
							<div className="account_noitem">
								Vous n'avez pas ajouter d'addresse dans votre compte client,
								<a href="/compte/addresses/create">Ajouter</a>
							</div>
						)}
					</section>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRoute(Addresses);
