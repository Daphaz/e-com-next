import React from "react";
import { priceFormatted } from "../helpers";

const Product = ({ product }) => {
	return (
		<a href={`/produits/${product.slug}`} className="products_item">
			<div className="products_img">
				<img
					src={`${process.env.NEXT_PUBLIC_BASE_URL_API}/static/${product.illustration}`}
					alt={product.subtitle}
					width="100%"
					height="auto"
				/>
				<div className="products_price">
					<span>{priceFormatted(product.price)}</span>
				</div>
			</div>
			<div className="products_legend">
				<h4 className="h6">{product.subtitle}</h4>
			</div>
		</a>
	);
};

export default Product;
