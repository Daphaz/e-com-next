import Head from "next/head";
import { Layout, Carousel, ProductFeatured } from "../components";

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>E-shop Project</title>
			</Head>
			<Carousel />
			<ProductFeatured />
		</Layout>
	);
}
