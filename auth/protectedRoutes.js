import React, { useEffect } from "react";
import useAuth from "./context";
import { useRouter } from "next/router";
import { getCookieFromBrowser, getCookieFromServer } from "./cookies";
import api from "./axios";

export const ProtectedRoute = (Component) => {
	return () => {
		const { isAuthenticated, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isAuthenticated && !loading) {
				router.push("/connexion");
			}
		}, [isAuthenticated, loading]);

		return <Component {...arguments} />;
	};
};

export const ProtectedRouteAdmin = (Component) => {
	return () => {
		const { isAuthenticatedAdmin, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isAuthenticatedAdmin && !loading) {
				router.push("/gestion");
			}
		}, [isAuthenticatedAdmin, loading]);

		const token = getCookieFromBrowser("token");

		api.defaults.headers.Authorization = `Bearer ${token}`;

		return <Component {...arguments} />;
	};
};

export function RequireAuthentificationAdmin(gssp) {
	return async (context) => {
		const { res, req } = context;
		const token = getCookieFromServer("token", req);

		if (!token) {
			res.statusCode = 302;
			res.setHeader("Location", "/gestion");
			return;
		}

		try {
			api.defaults.headers.Authorization = `Bearer ${token}`;
			const { data } = await api.get("/auth");

			if (data.data.roles !== "admin") {
				res.statusCode = 302;
				res.setHeader("Location", "/gestion");
				return;
			}
			return await gssp(context);
		} catch (error) {
			res.statusCode = 302;
			res.setHeader("Location", "/gestion");
			return;
		}
	};
}

export function RequireAuthentification(gssp) {
	return async (context) => {
		const { res, req } = context;
		const token = getCookieFromServer("token", req);

		if (!token) {
			res.statusCode = 302;
			res.setHeader("Location", "/");
			return;
		}

		try {
			api.defaults.headers.Authorization = `Bearer ${token}`;
			const { data } = await api.get("/auth");
			if (data.status) {
				return await gssp(context);
			} else {
				res.statusCode = 302;
				res.setHeader("Location", "/");
				return;
			}
		} catch (error) {
			res.statusCode = 302;
			res.setHeader("Location", "/");
			return;
		}
	};
}
