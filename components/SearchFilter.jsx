import React, { useState } from "react";
import { Form, Input } from "./index";
import useSWR from "swr";
import { formValid } from "../helpers";
import OptionCategory from "./Admin/OptionCategory";
import api from "../auth/axios";

const fetcher = (url) =>
	api
		.get(url)
		.then((res) => res.data.data)
		.catch((err) => console.log(err));

const initialState = {
	search: "",
	category: "",
	errors: {
		request: "",
	},
};

const SearchFilter = ({ setProducts }) => {
	const [state, setState] = useState(initialState);
	const { data: category } = useSWR("/category/all", fetcher);

	function handleChange(e) {
		const { name, value } = e.target;

		setState({ ...state, [name]: value });
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			const { search, category } = state;

			console.log(search, category);

			try {
				const { data } = await api.get("/product/search", {
					params: {
						search,
						category: category === "none" ? null : category,
					},
				});

				if (data.status) {
					setProducts(data.data);
				}
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					errors: { ...state.errors, [type]: message },
				});
			}
		} else {
			console.log("form invalid");
		}
	}

	return (
		<Form onSubmit={onSubmit}>
			<Input
				type="text"
				name="search"
				placeholder="votre recherche"
				handleChange={handleChange}
			/>
			<Input
				type="select"
				name="category"
				label="categorie"
				Options={<OptionCategory category={category} />}
				handleChange={handleChange}
				defaultOption="choisir une categorie"
			/>
			<button type="submit" className="btn btn__primary">
				rechercher
			</button>
		</Form>
	);
};

export default SearchFilter;
