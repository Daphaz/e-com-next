import React, { useState } from "react";
import { Layout, CartItem } from "../components";
import { priceFormatted } from "../helpers";
import { RequireAuthentification } from "../auth/protectedRoutes";
import useAuth from "../auth/context";
import api from "../auth/axios";

const Cart = ({ cart }) => {
	const [total, setTotal] = useState(0);
	const { isAuthenticated } = useAuth();

	return (
		<>
			{isAuthenticated && (
				<Layout>
					<section className="cart container">
						<h2 className="h2">Mon panier</h2>
						<p className="cart_subtitle">
							retourver tous vos articles dans votre panier
						</p>
						{cart && cart.products.length > 0 ? (
							<div className="cart_list">
								<h4 className="h5">Liste des produits</h4>
								<div className="table_wrap">
									<table className="table">
										<thead className="table_thead">
											<tr>
												<th>&nbsp;</th>
												<th>Produit</th>
												<th>Prix</th>
												<th>Quantiter</th>
												<th>total</th>
												<th>&nbsp;</th>
											</tr>
										</thead>
										<tbody>
											{cart.products.map((item, i) => (
												<CartItem item={item} key={i} />
											))}
										</tbody>
									</table>
								</div>
								<div className="cart_total">
									<div className="cart_products">
										<h6 className="h6">
											Nombre de produits: <strong>{cart.length}</strong>
										</h6>
									</div>
									<div className="cart_totalPrice">
										<h6 className="h6">
											Total de mon panier:
											<strong>{priceFormatted(total)}</strong>
										</h6>
									</div>
								</div>
								<div className="cart_action">
									<a href="#" className="btn btn_green">
										Valider mon panier
									</a>
								</div>
							</div>
						) : (
							<div className="cart_noitem">
								<p className="h4">
									Vous n'avez pas encore de produit dans votre panier :(
								</p>
								<a href="/produits" className="btn btn__primary">
									Nos produits
								</a>
							</div>
						)}
					</section>
				</Layout>
			)}
		</>
	);
};

export const getServerSideProps = RequireAuthentification(async () => {
	const { data } = await api.get("/cart");

	if (data.status) {
		return {
			props: {
				cart: {
					products: data.data.products,
				},
			},
		};
	} else {
		return {
			props: {},
		};
	}
});

export default Cart;
