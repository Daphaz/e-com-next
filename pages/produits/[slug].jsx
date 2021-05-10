import React from "react";
import api from "../../auth/axios";
import { priceFormatted } from "../../helpers";
import { Layout, Alert } from "../../components";
import Router from "next/router";
import useAuth from "../../auth/context";
import useAlert from "../../constants/alert";

const Product = ({ product }) => {
	const { isAuthenticated, setCart } = useAuth();
	const { setAlertState, alertState } = useAlert();

	const handleAdd = async (productId) => {
		if (!isAuthenticated) {
			setAlertState({
				close: true,
				title: "Connexion",
				text: "Vous devez être connecter pour utiliser votre panier",
				type: "info",
			});
			Router.push("/connexion");
		} else {
			try {
				const { data } = await api.put("/cart/add", { productId });

				if (data.status) {
					setCart(data.data);
					Router.push("/cart");
				}
			} catch (error) {
				setAlertState({
					close: true,
					title: "Erreur",
					text: "Veuillez réésayer une erreur c'est produite",
					type: "danger",
				});
			}
		}
	};

	return (
		<>
			{product && (
				<Layout>
					{alertState.close && <Alert />}
					<section className="product container">
						<div className="product_content">
							<h2 className="h4">{product.name}</h2>
							<p className="product_subtitle">{product.subtitle}</p>
							<p className="product_description">{product.description}</p>
							<div className="product_footer">
								<div className="product_category">
									<span>{product.category}</span>
								</div>
								<div className="product_price">
									<span>{priceFormatted(product.price)}</span>
								</div>
							</div>
							<div className="product_cta">
								<button
									className="btn btn__primary"
									onClick={() => handleAdd(product.id)}>
									Ajouter au panier
								</button>
							</div>
						</div>
						<div className="product_illustration">
							<div className="outline">
								<div className="product_img">
									<img
										src={`${process.env.NEXT_PUBLIC_BASE_URL_API}/static/${product.illustration}`}
									/>
								</div>
							</div>
						</div>
					</section>
				</Layout>
			)}
		</>
	);
};

export const getStaticPaths = async () => {
	const { data } = await api.get("/product/all");

	if (data.status) {
		const paths = data.data.map((p) => ({
			params: {
				slug: p.slug,
			},
		}));

		return {
			paths,
			fallback: true,
		};
	}
	return;
};

export const getStaticProps = async ({ params }) => {
	const { slug } = params;
	const { data } = await api.get("/product", {
		params: {
			slug,
		},
	});

	if (data.status) {
		return {
			props: {
				product: data.data,
			},
		};
	} else {
		return {};
	}
};

export default Product;
