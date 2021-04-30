import React from "react";
import styles from "../../styles/admin.module.scss";

const Login = () => {
	return (
		<div className={styles.loginAdmin}>
			<div className={styles.loginAdmin__left}>
				<img src="/images/loginAdmin.jpg" alt="login page" />
			</div>
			<div className={styles.loginAdmin__right}>
				<h3>Gestion de E-shop</h3>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				<form className="form">
					<div className="form__group">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" id="email" />
						<div className="alert alert__danger">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
							itaque.
						</div>
					</div>
					<div className="form__group">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" id="password" />
						<div className="alert alert__danger">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
							itaque.
						</div>
					</div>
					<button type="submit" className="btn btn__primary">
						login
					</button>
					<a href="#" className="form__link">
						Mot de passe oublié ?
					</a>
				</form>
			</div>
		</div>
	);
};

export default Login;
