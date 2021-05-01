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
					<a href="/">E-Shop</a>
					<div className={styles.sidebar__close} onClick={closeSidebar}>
						<Close />
					</div>
				</header>
				<nav>
					<ul>
						<Link href="/gestion/dashboard">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion/dashboard" &&
										styles.navItemActive
									}`}>
									<Dash />
									<span>Dashboard</span>
								</li>
							</a>
						</Link>
						<Link href="/gestion/clients">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion/clients" &&
										styles.navItemActive
									}`}>
									<Client />
									<span>Clients</span>
								</li>
							</a>
						</Link>
						<Link href="/gestion/commandes">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion/commandes" &&
										styles.navItemActive
									}`}>
									<Receipt />
									<span>Commandes</span>
								</li>
							</a>
						</Link>
						<Link href="/gestion/categories">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion/categories" &&
										styles.navItemActive
									}`}>
									<Sign />
									<span>Categories</span>
								</li>
							</a>
						</Link>
						<Link href="/gestion/produits">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion/produits" &&
										styles.navItemActive
									}`}>
									<Tag />
									<span>Produits</span>
								</li>
							</a>
						</Link>
						<Link href="/gestion/transporteur">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion/transporteur" &&
										styles.navItemActive
									}`}>
									<Carrier />
									<span>Transports</span>
								</li>
							</a>
						</Link>
						<Link href="/gestion/carousel">
							<a>
								<li
									className={`${styles.navItem} ${
										router.pathname === "/gestion/carousel" &&
										styles.navItemActive
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
