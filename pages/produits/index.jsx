import React, { useState } from "react";
import api from "../../auth/axios";
import { Layout, Product, SearchFilter } from "../../components";

const Products = ({ products }) => {
	const [state, setState] = useState(products);

	return (
		<Layout>
			<section className="products container">
				<div className="products_row">
					<aside className="products_filter">
						<h3 className="h5">Filtre</h3>
						<div className="filter_list">
							<SearchFilter setProducts={setState} />
						</div>
					</aside>
					{state.length > 0 && (
						<div className="products_grid">
							{state.map((product) => (
								<Product product={product} key={product.id} />
							))}
						</div>
					)}
				</div>
			</section>
		</Layout>
	);
};

export const getServerSideProps = async () => {
	try {
		const { data } = await api.get("/product/all");

		if (data.status) {
			return {
				props: {
					products: data.data,
				},
			};
		}

		return {
			props: {
				products: [],
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				products: [],
			},
		};
	}
};

export default Products;
