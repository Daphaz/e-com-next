import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel2";
import Slide from "./Slide";
import api from "../../auth/axios";

const options = {
	items: 1,
	nav: false,
	dots: true,
	loop: true,
	smartSpeed: 700,
};

const Carousel = () => {
	const [carousel, setCarousel] = useState(null);

	const loadCarousel = async () => {
		try {
			const { data } = await api.get("/carousel/all");

			if (data.status) {
				setCarousel(data.data);
			}
		} catch (error) {
			console.log(error);
			setCarousel(null);
		}
	};

	useEffect(() => {
		loadCarousel();

		return () => loadCarousel;
	}, []);

	return (
		<>
			{carousel && (
				<section className="hero">
					<OwlCarousel options={options}>
						{carousel.map((item, i) => (
							<Slide carousel={item} key={i} />
						))}
					</OwlCarousel>
				</section>
			)}
		</>
	);
};

export default Carousel;
