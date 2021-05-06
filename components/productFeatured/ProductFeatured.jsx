import React, { useState, useEffect } from "react";
import api from "../../auth/axios";
import Product from "./Product";

const ProductFeatured = () => {
	const [product, setProduct] = useState(null);

	const loadProduct = async () => {
		try {
			const { data } = await api.get("product/is-best");

			if (data.status) {
				setProduct(data.data);
			}
		} catch (error) {
			console.log(error);
			setProduct(null);
		}
	};

	useEffect(() => {
		loadProduct();
	}, []);

	return (
		<section className="productFeatured container">
			{product && (
				<div className="productFeatured_list">
					{product.map((p) => (
						<Product product={p} key={p.id} />
					))}
				</div>
			)}
			<div className="productFeatured_link">
				<a href="#">Voir le catalogue</a>
			</div>
		</section>
	);
};

export default ProductFeatured;
