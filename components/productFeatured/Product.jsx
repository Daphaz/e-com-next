import React from "react";

const Product = ({ product }) => {
	return (
		<div className="productFeatured_product">
			<div className="productFeatured_item">
				<img
					src={`${process.env.NEXT_PUBLIC_BASE_URL_API}/static/${product.illustration}`}
					alt={product.name}
				/>
				<a
					href={`${process.env.NEXT_PUBLIC_BASE_URL}/produits/${product.slug}`}
					className="overlay">
					<h4 className="h5">Voir</h4>
				</a>
			</div>
			<div className="productFeatured_label">
				<h5 className="h6">{product.name}</h5>
			</div>
		</div>
	);
};

export default Product;
