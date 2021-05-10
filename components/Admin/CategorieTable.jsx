import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import OrderVertical from "../../public/icons/icon-order-vertical.svg";
import CalendarAdd from "../../public/icons/icon-calendar-add.svg";
import Trash from "../../public/icons/icon-trash.svg";
import Edit from "../../public/icons/icon-edit.svg";
import Pagination from "../Pagination";
import Router from "next/router";

const CategorieTable = ({ categories, deleteCategory }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const itemsPerPage = 5;
	const pagesVisited = pageNumber * itemsPerPage;

	function displayItems() {
		return categories
			.slice(pagesVisited, pagesVisited + itemsPerPage)
			.map((item, i) => {
				return (
					<div className={styles.table__row} key={item.id}>
						<div className={styles.table__cell}>{i + 1}</div>
						<div className={styles.table__cell}>{item.name}</div>
						<div className={`${styles.table__cell} ${styles.table__btns}`}>
							<button
								className="btn btn__edit"
								onClick={() => handleEdit(item.id)}>
								<Edit />
							</button>
							<button
								className="btn btn__delete"
								onClick={() => deleteCategory(item.id)}>
								<Trash />
							</button>
						</div>
					</div>
				);
			});
	}

	const pageCount = Math.ceil(categories.length / itemsPerPage);

	function changePage({ selected }) {
		setPageNumber(selected);
	}

	function handleCreate() {
		Router.push("/gestion/categories/create");
	}

	function handleEdit(id) {
		Router.push(`/gestion/categories/edit/${id}`);
	}

	return (
		<div className={styles.admin__table}>
			<div className={styles.table__header}>
				<h3>Catégories</h3>
				<div className={styles.table__create}>
					<button className="btn btn__create" onClick={handleCreate}>
						<CalendarAdd />
						Créer une categorie
					</button>
				</div>
			</div>
			<div className={styles.table}>
				<div className={`${styles.table__row} ${styles.table__head}`}>
					<div className={styles.table__cell}>
						Id <OrderVertical />
					</div>
					<div className={styles.table__cell}>
						Nom <OrderVertical />
					</div>
					<div className={styles.table__cell}></div>
				</div>
				{displayItems()}
				<div className={styles.table__footer}>
					<div className={styles.table__cell}>
						<span>{categories.length}</span>
						<p>résultats</p>
					</div>
					<div className={styles.table__cell}></div>
					<div className={styles.table__cell}>
						<Pagination changePage={changePage} pageCount={pageCount} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategorieTable;
