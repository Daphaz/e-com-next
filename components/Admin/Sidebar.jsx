import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Dash from "../../public/icons/icon-dashboard.svg";
import Client from "../../public/icons/icon-user-couple.svg";
import Receipt from "../../public/icons/icon-receipt.svg";
import Sign from "../../public/icons/icon-sign.svg";
import Tag from "../../public/icons/icon-tag.svg";
import Carrier from "../../public/icons/icon-deliver.svg";
import Pres from "../../public/icons/icon-presentation.svg";

const Sidebar = ({ styles }) => {
	const router = useRouter();

	return (
		<aside className={styles.sidebar}>
			<header>
				<a href="#">E-Shop</a>
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
								Dashboard
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
								Clients
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
								Commandes
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
								Categories
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
								Produits
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
								Transports
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
								Carousel
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
	);
};

export default Sidebar;
