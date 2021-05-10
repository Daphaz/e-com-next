import React, { useState } from "react";
import api from "../../../../auth/axios";
import useAuth from "../../../../auth/context";
import { RequireAuthentification } from "../../../../auth/protectedRoutes";
import { Form, Input, Layout } from "../../../../components";
import { formValid } from "../../../../helpers";
import Router from "next/router";

const EditAddress = ({ address }) => {
	const { isAuthenticated } = useAuth();

	const [state, setState] = useState({
		name: address.name,
		firstname: address.firstname,
		lastname: address.lastname,
		company: address.company,
		address: address.address,
		postal: address.postal,
		city: address.city,
		country: address.country,
		phone: address.phone,
		id: address.id,
		errors: {
			request: "",
		},
	});

	function handleChange(e) {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	}

	async function onSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				const {
					name,
					firstname,
					lastname,
					company,
					address,
					postal,
					city,
					country,
					phone,
					id,
				} = state;

				const { data } = await api.put(`/address/update/${id}`, {
					name,
					firstname,
					lastname,
					company,
					address,
					postal,
					city,
					country,
					phone,
				});

				if (data.status) {
					Router.push("/compte/addresses");
				}
			} catch (error) {
				console.log(error);
				const { type, message } = error.response.data;
				setState({
					...state,
					[type]: "",
					errors: { ...state.errors, [type]: message },
				});
			}
		} else {
			console.log("form invalid");
		}
	}
	return (
		<>
			{isAuthenticated && (
				<Layout>
					<section className="account container">
						<h1 className="h1">Créer une addresses</h1>
						<Form onSubmit={onSubmit}>
							<Input
								type="text"
								name="name"
								label="Nom de l'addresse"
								handleChange={handleChange}
								value={state.name}
								required></Input>
							<div className="form__control">
								<Input
									type="text"
									name="firstname"
									label="Prénom"
									handleChange={handleChange}
									value={state.firstname}
									required></Input>
								<Input
									type="text"
									name="lastname"
									label="Nom"
									handleChange={handleChange}
									value={state.lastname}
									required></Input>
							</div>
							<Input
								type="text"
								name="company"
								label="Entreprise"
								handleChange={handleChange}
								value={state.company}></Input>
							<Input
								type="textarea"
								name="address"
								label="addresse"
								handleChange={handleChange}
								value={state.address}
								required></Input>
							<div className="form__control">
								<Input
									type="text"
									name="postal"
									label="code postale"
									handleChange={handleChange}
									value={state.postal}
									required></Input>
								<Input
									type="text"
									name="city"
									label="Ville"
									handleChange={handleChange}
									value={state.city}
									required></Input>
							</div>
							<Input
								type="text"
								name="country"
								label="Pays"
								handleChange={handleChange}
								value={state.country}
								required></Input>
							<Input
								type="text"
								name="phone"
								label="telephone"
								handleChange={handleChange}
								value={state.phone}
								required></Input>
							<button type="submit" className="btn btn__primary">
								enregistrer
							</button>
						</Form>
					</section>
				</Layout>
			)}
		</>
	);
};

export const getServerSideProps = RequireAuthentification(async ({ query }) => {
	const { id } = query;
	const { data } = await api.get("/address/edit", {
		params: { id },
	});
	if (data.status) {
		return {
			props: {
				address: data.data,
			},
		};
	}

	return {
		props: {},
	};
});

export default EditAddress;
