import React, { useRef } from "react";
import Link from "next/link";
import Chevron from "../../public/icons/icon-cheveron-down.svg";
import Logout from "../../public/icons/icon-door-exit.svg";
import Menu from "../../public/icons/icon-menu.svg";

const Header = ({ styles }) => {
	const menu = useRef(null);

	function handleMenu() {
		menu.current.classList.toggle(styles.menu__active);
	}

	function openMenu() {
		const sidebar = document.getElementById("sidebar");
		const sideBg = document.querySelector(`.${styles.sidebar__bg}`);
		sidebar.classList.toggle(styles.sidebar__open);
		sideBg.classList.toggle(styles.sidebar__bg_open);
		document.body.classList.toggle("is_open");
	}

	return (
		<header className={styles.header}>
			<div className={styles.header__menu} onClick={openMenu}>
				<Menu />
			</div>
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
