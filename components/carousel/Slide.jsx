import React from "react";

const Slide = ({ carousel }) => {
	return (
		<div className="hero_slider">
			<div className="hero_wrap">
				<h1 className="hero_title">{carousel.title}</h1>
				<p className="hero_subtitle">{carousel.content}</p>
				<div className="hero_btn">
					<a href={carousel.btn_url} className="btn btn__white">
						{carousel.btn_title}
					</a>
				</div>
			</div>
			<div className="hero_preview">
				<img
					src={`${process.env.NEXT_PUBLIC_BASE_URL_API}/static/${carousel.illustration}`}
					alt={carousel.title}
					width="100%"
					height="100%"
				/>
			</div>
		</div>
	);
};

export default Slide;
