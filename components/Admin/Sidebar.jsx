import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Dash from "../../public/icons/icon-dashboard.svg";
import Client from "../../public/icons/icon-user-couple.svg";
import Receipt from "../../public/icons/icon-receipt.svg";
import Sign from "../../public/icons/icon-sign.svg";
import Tag from "../../public/icons/icon-tag.svg";
import Carrier from "../../public/icons/icon-deliver.svg";
import Pres from "../../public/icons/icon-presentation.svg";
import Close from "../../public/icons/icon-close.svg";

const Sidebar = ({ styles }) => {
	const side = useRef(null);
	const router = useRouter();

	function closeSidebar() {
		const sideBg = document.querySelector(`.${styles.sidebar__bg}`);
		side.current.classList.remove(styles.sidebar__open);
		sideBg.classList.remove(styles.sidebar__bg_open);
		document.body.classList.remove("is_open");
	}

	return (
		<>
			<div className={styles.sidebar__bg}></div>
			<aside className={styles.sidebar} id="sidebar" ref={side}>
				<header>
					<a href="#">E-Shop</a>
					<div className={styles.sidebar__close} onClick={closeSidebar}>
						<Close />
					</div>
				</header>
				<nav>
					<ul>
						<Link href="/gestion">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion" && styles.navItemActive
									}`}>
									<Dash />
									<span>Dashboard</span>
								</li>
							</a>
						</Link>
						<Link href="/clients">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/clients" && styles.navItemActive
									}`}>
									<Client />
									<span>Clients</span>
								</li>
							</a>
						</Link>
						<Link href="/commandes">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/commandes" && styles.navItemActive
									}`}>
									<Receipt />
									<span>Commandes</span>
								</li>
							</a>
						</Link>
						<Link href="/categories">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/categories" && styles.navItemActive
									}`}>
									<Sign />
									<span>Categories</span>
								</li>
							</a>
						</Link>
						<Link href="/produits">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/produits" && styles.navItemActive
									}`}>
									<Tag />
									<span>Produits</span>
								</li>
							</a>
						</Link>
						<Link href="/transporteur">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/transporteur" && styles.navItemActive
									}`}>
									<Carrier />
									<span>Transports</span>
								</li>
							</a>
						</Link>
						<Link href="/carousel">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/carousel" && styles.navItemActive
									}`}>
									<Pres />
									<span>Carousel</span>
								</li>
							</a>
						</Link>
					</ul>
				</nav>
				<footer>
					<span>Dashboard</span>
					<small>All right reserved {new Date().getFullYear()}</small>
				</footer>
			</aside>
		</>
	);
};

export default Sidebar;
