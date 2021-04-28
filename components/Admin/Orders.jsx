import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import AddOrder from "./../../public/icons/icon-document-add.svg";
import Edit from "../../public/icons/icon-edit.svg";
import Pagination from "../Pagination";

const datas = [
	{
		id: 0,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 0,
	},
	{
		id: 1,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 2,
	},
	{
		id: 2,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 1,
	},
	{
		id: 3,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 3,
	},
	{
		id: 4,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 1,
	},
	{
		id: 5,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 2,
	},
	{
		id: 6,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 0,
	},
	{
		id: 7,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 1,
	},
	{
		id: 8,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 3,
	},
	{
		id: 9,
		client: "Jhon Doe",
		reference: "xshb-shdr-dhez-sore",
		createdAt: "28 / 04 / 2021",
		total: "458.95 €",
		carrier: "Colissimo",
		status: 2,
	},
];

const Orders = ({ commandes, footer }) => {
	const [orders, setOrders] = useState(datas);
	const [pageNumber, setPageNumber] = useState(0);
	const ordersPerPage = 5;
	const pagesVisited = pageNumber * ordersPerPage;

	function displayOrders() {
		return orders
			.slice(pagesVisited, pagesVisited + ordersPerPage)
			.map((order) => {
				let status = {};
				switch (order.status) {
					case 0:
						status.label = "Attente";
						status.class = styles.badge__red;
						break;
					case 1:
						status.label = "Préparation";
						status.class = styles.badge__yellow;
						break;
					case 2:
						status.label = "Livraison";
						status.class = styles.badge__blue;
						break;
					case 3:
						status.label = "Terminé";
						status.class = styles.badge__green;
						break;

					default:
						break;
				}
				return (
					<div className={styles.table__row} key={order.id}>
						<div className={styles.table__cell}>{order.client}</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							{order.reference}
						</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							{order.createdAt}
						</div>
						<div className={styles.table__cell}>{order.total}</div>
						<div className={`${styles.table__cell} ${styles.l_hide}`}>
							{order.carrier}
						</div>
						<div className={styles.table__cell}>
							<span className={`${styles.badge} ${status.class}`}>
								{status.label}
							</span>
						</div>
						<div className={`${styles.table__cell} ${styles.table__btns}`}>
							<button className="btn btn__edit">
								<Edit />
							</button>
						</div>
					</div>
				);
			});
	}

	const pageCount = Math.ceil(orders.length / ordersPerPage);

	function changePage({ selected }) {
		setPageNumber(selected);
	}

	return (
		<div className={styles.admin__table}>
			{!commandes ? (
				<h2>Commandes récentes</h2>
			) : (
				<div className={styles.table__header}>
					<h3>Commandes</h3>
					<div className={styles.table__create}>
						<button className="btn btn__create">
							<AddOrder />
							Créer une commande
						</button>
					</div>
				</div>
			)}
			<div className={styles.table}>
				<div className={`${styles.table__row} ${styles.table__head}`}>
					<div className={styles.table__cell}>Client</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Référence
					</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Crée le
					</div>
					<div className={styles.table__cell}>Total</div>
					<div className={`${styles.table__cell} ${styles.l_hide}`}>
						Transport
					</div>
					<div className={styles.table__cell}>Status</div>
					<div className={styles.table__cell}></div>
				</div>
				{displayOrders()}
				{footer && (
					<div className={styles.table__footer}>
						<div className={styles.table__cell}>
							<span>{orders.length}</span>
							<p>résultats</p>
						</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}></div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}></div>
						<div className={styles.table__cell}></div>
						<div className={styles.table__cell}></div>
						<div className={`${styles.table__cell} ${styles.l_hide}`}></div>
						<div className={styles.table__cell}>
							<Pagination changePage={changePage} pageCount={pageCount} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Orders;
