import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import useAuth from "../../auth/context";
import { redirectAdminFromServer } from "../../auth/cookies";
import { formValid, handleChangeLogin } from "../../helpers";
import { Form, FormErrors, Input } from "../../components";

const initialState = {
	email: "",
	password: "",
	errors: {
		email: "",
		password: "",
	},
	formIsValid: false,
};

const Login = () => {
	const [state, setState] = useState(initialState);
	const { login } = useAuth();

	async function formSubmit(e) {
		e.preventDefault();

		if (formValid(state)) {
			try {
				await login(state.email, state.password);
			} catch (error) {
				const { type, message } = error.response.data;
				setState({
					...state,
					[type || "email"]: "",
					errors: { ...state.errors, [type || "email"]: message },
					formIsValid: false,
				});
			}
		} else {
			console.log("form invalid");
		}
	}

	return (
		<div className={styles.loginAdmin}>
			<div className={styles.loginAdmin__left}>
				<img src="/images/loginAdmin.jpg" alt="login page" />
			</div>
			<div className={styles.loginAdmin__right}>
				<h3>Gestion de E-shop</h3>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<Form onSubmit={formSubmit}>
					<Input
						type="email"
						name="email"
						label="Email"
						value={state.email}
						handleChange={(e) => handleChangeLogin(e, state, setState)}>
						{state.errors.email.length > 0 && (
							<FormErrors error={state.errors.email} />
						)}
					</Input>
					<Input
						type="password"
						name="password"
						label="Password"
						value={state.password}
						handleChange={(e) => handleChangeLogin(e, state, setState)}>
						{state.errors.password.length > 0 && (
							<FormErrors error={state.errors.password} />
						)}
					</Input>
					<button
						type="submit"
						className="btn btn__primary"
						disabled={!state.formIsValid}>
						login
					</button>
					<a href="#" className="form__link">
						Mot de passe oublié ?
					</a>
				</Form>
			</div>
		</div>
	);
};

export const getServerSideProps = async (context) => {
	redirectAdminFromServer(context);

	return {
		props: {},
	};
};

export default Login;
