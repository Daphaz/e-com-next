import React from "react";
import useAuth from "../../auth/context";
import { ProtectedRoute } from "../../auth/protectedRoutes";
import { Layout, Alert } from "../../components";
import useAlert from "../../constants/alert";

const Account = () => {
	const { alertState } = useAlert();
	const { isAuthenticated, user } = useAuth();

	return (
		<>
			{isAuthenticated && (
				<Layout>
					{alertState.close && <Alert />}
					<section className="account container">
						<h1 className="h1">Mon Compte</h1>
						<div className="account_subtitle">
							<p>
								Bienvenue {user.firstname} dans votre compte. C'est dans cet
								espace que vous allez pouvoir gérer toutes vos informations
								personnelles.
							</p>
						</div>
						<ul className="account_links">
							{user.roles === "admin" && (
								<li className="account_link">
									<a href="/gestion">Accéder au backoffice</a>
								</li>
							)}
							<li className="account_link">
								<a href="/compte/modifier-mot-de-passe">
									Modifier mon mot de passe
								</a>
							</li>
							<li className="account_link">
								<a href="/compte/addresses">Mes Addresses</a>
							</li>
							<li className="account_link">
								<a href="/compte/commandes">Mes Commandes</a>
							</li>
						</ul>
					</section>
				</Layout>
			)}
		</>
	);
};

export default ProtectedRoute(Account);
