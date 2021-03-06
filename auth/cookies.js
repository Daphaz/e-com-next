import cookie from "js-cookie";
import api from "../auth/axios";
import Router from "next/router";

export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1,
			path: "/",
			sameSite: "Strict",
		});
	}
};

export const removeCookie = (key) => {
	if (process.browser) {
		cookie.remove(key);
	}
};

export const getCookieFromBrowser = (key) => {
	return cookie.get(key);
};

export const getCookieFromServer = (key, req) => {
	if (!req.headers.cookie) {
		return undefined;
	}
	const rawCookie = req.headers.cookie
		.split(";")
		.find((c) => c.trim().startsWith(`${key}=`));
	if (!rawCookie) {
		return undefined;
	}
	return rawCookie.split("=")[1];
};

export const redirectFromServer = (context) => {
	if (context.req.headers.cookie) {
		const token = getCookieFromServer("token", context.req);
		if (token) {
			context.res.statusCode = 302;
			context.res.setHeader("Location", "/");
		}
	}
};

export const redirectAdminFromServer = (context) => {
	if (context.req.headers.cookie) {
		const token = getCookieFromServer("token", context.req);
		if (token) {
			context.res.statusCode = 302;
			context.res.setHeader("Location", "/gestion/dashboard");
		}
	}
};
