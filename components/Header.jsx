import React, { useRef } from "react";
import useAuth from "../auth/context";
import IconUser from "../public/icons/icon-user.svg";
import IconShop from "../public/icons/icon-shopping-cart.svg";
import IconMenu from "../public/icons/icon-menu.svg";
import IconClose from "../public/icons/icon-close.svg";

const Header = () => {
	const menu = useRef(null);
	const { logout, user } = useAuth();

	function openMenu() {
		menu.current.classList.toggle("active");
		document.body.classList.toggle("is_open");
	}
	return (
		<>
			<div className="header__menuMobile_bg" ref={menu}>
				<div className="header__menuMobile">
					<div className="header__menuMobile_close" onClick={openMenu}>
						<IconClose />
					</div>
					<nav className="header__nav">
						<ul className="header__navlinks">
							<li className="header__links">
								<a href="#">Compte</a>
							</li>
							<li className="header__links">
								<a href="#">Nos produits</a>
							</li>
							<li className="header__links">
								<a href="#">Qui sommes nous ?</a>
							</li>
							<li className="header__links">
								<a href="#">Contact</a>
							</li>
						</ul>
					</nav>
					<div className="header__actions">
						<a href="#">
							<IconUser />
						</a>
						<a href="#">
							<IconShop />
						</a>
					</div>
				</div>
			</div>
			<header className="header">
				<div className="container">
					<div className="header__logo">E-Shop</div>
					<nav className="header__nav">
						<ul className="header__navlinks">
							<li className="header__links">
								<a href="#">Compte</a>
							</li>
							<li className="header__links">
								<a href="#">Nos produits</a>
							</li>
							<li className="header__links">
								<a href="#">Qui sommes nous ?</a>
							</li>
							<li className="header__links">
								<a href="#">Contact</a>
							</li>
						</ul>
					</nav>
					<div className="header__actions">
						<a href="#">
							<IconUser />
						</a>
						<a href="#">
							<IconShop />
						</a>
					</div>
					<div className="header__burger" onClick={openMenu}>
						<IconMenu />
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
