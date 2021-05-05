import React, { useEffect } from "react";
import useAuth from "./context";
import { useRouter } from "next/router";
import { getCookieFromServer } from "./cookies";
import axios from "axios";
import api from "./axios";

export const ProtectedRoute = (Component) => {
	return () => {
		const { isAuthenticated, loading } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isAuthenticated && !loading) {
				router.push("/login");
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
