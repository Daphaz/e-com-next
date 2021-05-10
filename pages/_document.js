import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang={"fr"}>
				<Head />
				<body>
					<Main />
					<NextScript />
					<script src="https://code.jquery.com/jquery-3.6.0.slim.min.js"></script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
