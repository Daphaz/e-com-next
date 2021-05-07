import { useState, createContext, useContext, useEffect } from "react";
import api from "./axios";
import Router from "next/router";
import { setCookie, removeCookie, getCookieFromBrowser } from "./cookies";
import jwt from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadUserFromCookies() {
			const token = getCookieFromBrowser("token");
			if (token) {
				try {
					api.defaults.headers.Authorization = `Bearer ${token}`;
					const userData = jwt(token);
					const { data: user } = await api.get("/user", {
						params: { id: userData.id },
					});
					if (user.status) setUser(user.data);
				} catch (e) {
					if (e.response.status === 401) {
						removeCookie("token");
						setUser(null);
						window.alert("Session expiré veuillez vous reconnecter");
					}
				}
			}
			setLoading(false);
		}
		loadUserFromCookies();
	}, []);
	const login = async (email, password) => {
		const { data: token } = await api.post("/auth/login", {
			email,
			password,
		});

		if (token) {
			setCookie("token", token);
			api.defaults.headers.Authorization = `Bearer ${token}`;
			const userData = jwt(token);
			const { data: user } = await api.get("/user", {
				params: { id: userData.id },
			});
			if (user.status) {
				setUser(user.data);
				if (Router.asPath === "/gestion") {
					await Router.push("/gestion/dashboard");
				} else {
					await Router.push("/compte");
				}
			}
		}
	};

	const logout = () => {
		removeCookie("token");
		setUser(null);
		Router.push("/gestion");
	};
	const logoutUser = () => {
		removeCookie("token");
		setUser(null);
		Router.push("/");
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !!user,
				isAuthenticatedAdmin: !!user && user.roles === "admin",
				user,
				login,
				logout,
				logoutUser,
				loading,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default function useAuth() {
	return useContext(AuthContext);
}
