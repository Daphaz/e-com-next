import React, { useRef } from "react";
import useAuth from "../auth/context";
import IconUser from "../public/icons/icon-user.svg";
import IconShop from "../public/icons/icon-shopping-cart.svg";
import IconMenu from "../public/icons/icon-menu.svg";
import IconClose from "../public/icons/icon-close.svg";
import IconExit from "../public/icons/icon-door-exit.svg";

const Header = () => {
	const menu = useRef(null);
	const { logoutUser, user, isAuthenticated } = useAuth();

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
								<a href="/compte">Compte</a>
							</li>
							<li className="header__links">
								<a href="/produits">Nos produits</a>
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
						{isAuthenticated ? (
							<div className="links" onClick={() => logoutUser()}>
								<IconExit />
							</div>
						) : (
							<a className="links" href="/connexion">
								<IconUser />
							</a>
						)}
						<a className="links" href="#">
							<IconShop />
						</a>
					</div>
				</div>
			</div>
			<header className="header">
				<div className="container">
					<a href="/" className="header__logo">
						E-Shop
					</a>
					<nav className="header__nav">
						<ul className="header__navlinks">
							<li className="header__links">
								<a href="/compte">Compte</a>
							</li>
							<li className="header__links">
								<a href="/produits">Nos produits</a>
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
						{isAuthenticated ? (
							<div className="links" onClick={() => logoutUser()}>
								<IconExit />
							</div>
						) : (
							<a className="links" href="/connexion">
								<IconUser />
							</a>
						)}
						<a className="links" href="#">
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
