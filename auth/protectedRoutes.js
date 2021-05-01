import React, { useEffect } from "react";
import useAuth from "./context";
import { useRouter } from "next/router";

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
