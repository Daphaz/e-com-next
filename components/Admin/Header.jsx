import React, { useRef } from "react";
import Link from "next/link";
import Chevron from "../../public/icons/icon-cheveron-down.svg";
import Logout from "../../public/icons/icon-door-exit.svg";

const Header = ({ styles }) => {
	const menu = useRef(null);

	function handleMenu() {
		console.log(menu.current);
		menu.current.classList.toggle(styles.menu__active);
	}

	return (
		<header className={styles.header}>
			<div className={styles.profile}>
				<img src="https://via.placeholder.com/55x55" alt="profile image" />
				<div className={styles.profile__warp}>
					<h3>Jhon Doe</h3>
					<p>Admin</p>
				</div>
				<div className={styles.icon__chevronDown} onClick={handleMenu}>
					<Chevron />
				</div>
				<ul className={styles.profile__menu} ref={menu}>
					<li>
						<Link href="/profile">
							<a>Profile</a>
						</Link>
					</li>
					<li>
						<Link href="/logout">
							<a>
								<Logout />
								Logout
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
