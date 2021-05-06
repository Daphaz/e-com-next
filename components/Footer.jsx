import React from "react";
import IconSend from "../public/icons/icon-send.svg";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer__top">
					<div className="footer__item">
						<div className="footer__headline">ipsum dolor.</div>
						<ul className="footer__links">
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
						</ul>
					</div>
					<div className="footer__item">
						<div className="footer__headline">ipsum dolor.</div>
						<ul className="footer__links">
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
						</ul>
					</div>
					<div className="footer__item">
						<div className="footer__headline">ipsum dolor.</div>
						<ul className="footer__links">
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
						</ul>
					</div>
					<div className="footer__item">
						<div className="footer__headline">ipsum dolor.</div>
						<ul className="footer__links">
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
							<li className="footer__link">
								<a href="#">Lorem</a>
							</li>
						</ul>
					</div>
					<div className="footer__subscribe">
						<div className="footer__headline">Newsletter</div>
						<div className="footer__subtitle">
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
								aliquid repellat repudiandae ratione voluptate quidem provident.
							</p>
						</div>
						<form className="form__subscribe">
							<div className="form__line">
								<label htmlFor="email"></label>
								<input type="email" name="email" id="email" />
								<button type="submit">
									<div className="icon__send">
										<IconSend />
									</div>
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="footer__bottom">
					<div className="footer__bottom_left">
						<p>Lorem ipsum dolor sit amet consectetur.</p>
					</div>
					<div className="footer__bottom_right">
						<ul>
							<li>
								<a href="#">Lorem, ipsum.</a>
							</li>
							<li>
								<a href="#">Lorem, ipsum.</a>
							</li>
							<li>
								<a href="#">Lorem, ipsum.</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
