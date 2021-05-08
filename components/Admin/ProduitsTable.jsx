import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import OrderVertical from "../../public/icons/icon-order-vertical.svg";
import IconAdd from "../../public/icons/icon-add.svg";
import Trash from "../../public/icons/icon-trash.svg";
import Edit from "../../public/icons/icon-edit.svg";
import Pagination from "../Pagination";
import { priceFormatted } from "../../helpers";
import Router from "next/router";
import api from "../../auth/axios";

const ProduitsTable = ({ products, deleteProduct }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const itemsPerPage = 5;
	const pagesVisited = pageNumber * itemsPerPage;

	function displayItems() {
		return products
			.slice(pagesVisited, pagesVisited + itemsPerPage)
			.map((item) => {
				return (
					<div className={styles.table__row} key={item.id}>
						<div className={styles.table__cell}>
							<div className={styles.product__name}>{item.name}</div>
						</div>
						<div className={styles.table__cell}>
							<div className={styles.product__illustration}>
								<img
									src={`${process.env.NEXT_PUBLIC_BASE_URL_API}/static/${item.illustration}`}
									alt={item.name}
								/>
							</div>
						</div>
						<div className={`${styles.table__cell} ${styles.xl_hide}`}>
							<div className={styles.product__subtitle}>{item.subtitle}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.xl_hide}`}>
							<div className={styles.product__description}>
								{item.description}
							</div>
						</div>
						<div className={`${styles.table__cell} ${styles.sm_hide}`}>
							<div className={styles.product__featured}>
								<input
									type="checkbox"
									name="featured"
									defaultChecked={item.isBest === 0 ? false : true}
									onChange={() => updateIsBest(item.id)}
									className={styles.product__featuredInput}
								/>
							</div>
						</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							<div className={styles.product__price}>
								{priceFormatted(item.price)}
							</div>
						</div>
						<div className={`${styles.table__cell} ${styles.l_hide}`}>
							<div className={styles.product__category}>{item.category}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.table__btns}`}>
							<button
								className="btn btn__edit"
								onClick={() => handleEdit(item.id)}>
								<Edit />
							</button>
							<button
								className="btn btn__delete"
								onClick={() => deleteProduct(item.id)}>
								<Trash />
							</button>
						</div>
					</div>
				);
			});
	}

	const pageCount = Math.ceil(products.length / itemsPerPage);

	function changePage({ selected }) {
		setPageNumber(selected);
	}

	function handleCreate() {
		Router.push("/gestion/produits/create");
	}

	function handleEdit(id) {
		Router.push(`/gestion/produits/edit/${id}`);
	}

	async function updateIsBest(id) {
		try {
			const { data } = await api.put(`/product/is-best/${id}`);
			if (data.status) {
				Router.push("/gestion/produits");
			}
		} catch (error) {
			console.log("Update IsBest: ", error);
		}
	}

	return (
		<div className={styles.admin__table}>
			<div className={styles.table__header}>
				<h3>Produits</h3>
				<div className={styles.table__create}>
					<button className="btn btn__create" onClick={handleCreate}>
						<IconAdd />
						Créer un produit
					</button>
				</div>
			</div>
			<div className={styles.table}>
				<div className={`${styles.table__row} ${styles.table__head}`}>
					<div className={styles.table__cell}>
						Nom <OrderVertical />
					</div>
					<div className={styles.table__cell}>illustration</div>
					<div className={`${styles.table__cell} ${styles.xl_hide}`}>
						Sous-titre
					</div>
					<div className={`${styles.table__cell} ${styles.xl_hide}`}>
						Description
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						en-avant
					</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>prix</div>
					<div className={`${styles.table__cell} ${styles.l_hide}`}>
						catégorie
					</div>
					<div className={styles.table__cell}></div>
				</div>
				{displayItems()}
				<div className={styles.table__footer}>
					<div className={styles.table__cell}>
						<span>{products.length}</span>
						<p>résultats</p>
					</div>
					<div className={`${styles.table__cell} ${styles.xl_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.xl_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.l_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}></div>
					<div className={styles.table__cell}></div>
					<div className={styles.table__cell}>
						<Pagination changePage={changePage} pageCount={pageCount} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProduitsTable;
