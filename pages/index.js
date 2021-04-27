import Head from "next/head";
import { Layout } from "../components";

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>E-shop Project</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="Description" content="E-shop node and nextjs" />
			</Head>
			<div className="container">hello</div>
		</Layout>
	);
}
