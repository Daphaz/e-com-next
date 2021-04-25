import "../styles/global.css";
import { AuthProvider } from "../auth/context";
import Nprogress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import { Layout } from "../components";

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
		<Layout>
			<Head>
				<link rel="stylesheet" type="text/css" href="/nprogress.css" />
			</Head>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</Layout>
	);
}

export default MyApp;
