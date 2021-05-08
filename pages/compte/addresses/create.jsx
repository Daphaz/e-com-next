import React, { useState } from "react";
import api from "../../../auth/axios";
import useAuth from "../../../auth/context";
import { ProtectedRoute } from "../../../auth/protectedRoutes";
import { Form, Input, Layout } from "../../../components";
import { formValid } from "../../../helpers";
import Router from "next/router";

const initialState = {
	name: "",
	firstname: "",
	lastname: "",
	company: "",
	address: "",
	postal: "",
	city: "",
	country: "",
	phone: "",
	errors: {
		request: "",
	},
};

const CreateAddress = () => {
	const { isAuthenticated, user } = useAuth();

	const [state, setState] = useState(initialState);

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
				} = state;

				const { data } = await api.post("/address/create", {
					userId: user.id,
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

export default ProtectedRoute(CreateAddress);
