import React from "react";

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<div className="header--logo">Logo</div>
				<nav className="header--nav">
					<ul className="header--navlinks">
						<li className="header--links">
							<a href="#">lorem</a>
						</li>
						<li className="header--links">
							<a href="#">lorem</a>
						</li>
						<li className="header--links">
							<a href="#">lorem</a>
						</li>
					</ul>
				</nav>
				<div className="header--actions">
					<a href="#">
						<img
							src="/icons/icon-user.svg"
							alt="user"
							width="30px"
							height="30px"
						/>
					</a>
					<a href="#">
						<img
							src="/icons/icon-shopping-cart.svg"
							alt="cart"
							width="30px"
							height="30px"
						/>
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
