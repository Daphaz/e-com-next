import "../styles/global.scss";
import { AuthProvider } from "../auth/context";
import Nprogress from "nprogress";
import Router from "next/router";
import Head from "next/head";

Router.events.on("routeChangeStart", () => {
	Nprogress.start();
});
Router.events.on("routeChangeComplete", () => {
	Nprogress.done();
});
Router.events.on("routeChangeError", () => {
	Nprogress.start();
});

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="stylesheet" type="text/css" href="/nprogress.css" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="Description" content="E-shop node and nextjs" />
			</Head>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</>
	);
}

export default MyApp;
