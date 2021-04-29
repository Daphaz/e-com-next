import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import OrderVertical from "../../public/icons/icon-order-vertical.svg";
import CalendarAdd from "../../public/icons/icon-calendar-add.svg";
import Trash from "../../public/icons/icon-trash.svg";
import Edit from "../../public/icons/icon-edit.svg";
import Pagination from "../Pagination";

const datas = [
	{
		id: 1,
		name: "Colissimo",
		description: "profiter d'une libvraison en 48H",
		price: "14.99 €",
	},
	{
		id: 2,
		name: "Chronopost",
		description: "livraison en 24h",
		price: "9.90 €",
	},
];

const TransportTable = () => {
	const [items, setItems] = useState(datas);
	const [pageNumber, setPageNumber] = useState(0);
	const itemsPerPage = 5;
	const pagesVisited = pageNumber * itemsPerPage;

	function displayItems() {
		return items
			.slice(pagesVisited, pagesVisited + itemsPerPage)
			.map((item) => {
				return (
					<div className={styles.table__row} key={item.id}>
						<div className={styles.table__cell}>{item.name}</div>
						<div className={styles.table__cell}>{item.description}</div>
						<div className={styles.table__cell}>{item.price}</div>
						<div className={`${styles.table__cell} ${styles.table__btns}`}>
							<button className="btn btn__edit">
								<Edit />
							</button>
							<button className="btn btn__delete">
								<Trash />
							</button>
						</div>
					</div>
				);
			});
	}

	const pageCount = Math.ceil(items.length / itemsPerPage);

	function changePage({ selected }) {
		setPageNumber(selected);
	}

	return (
		<div className={styles.admin__table}>
			<div className={styles.table__header}>
				<h3>Transports</h3>
				<div className={styles.table__create}>
					<button className="btn btn__create">
						<CalendarAdd />
						Ajouter un transport
					</button>
				</div>
			</div>
			<div className={styles.table}>
				<div className={`${styles.table__row} ${styles.table__head}`}>
					<div className={styles.table__cell}>
						Nom <OrderVertical />
					</div>
					<div className={styles.table__cell}>
						Description <OrderVertical />
					</div>
					<div className={styles.table__cell}>
						prix <OrderVertical />
					</div>
					<div className={styles.table__cell}></div>
				</div>
				{displayItems()}
				<div className={styles.table__footer}>
					<div className={styles.table__cell}>
						<span>{items.length}</span>
						<p>résultats</p>
					</div>
					<div className={styles.table__cell}></div>
					<div className={styles.table__cell}></div>
					<div className={styles.table__cell}>
						<Pagination changePage={changePage} pageCount={pageCount} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransportTable;
