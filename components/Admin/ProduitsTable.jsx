import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import OrderVertical from "../../public/icons/icon-order-vertical.svg";
import IconAdd from "../../public/icons/icon-add.svg";
import Trash from "../../public/icons/icon-trash.svg";
import Edit from "../../public/icons/icon-edit.svg";
import Pagination from "../Pagination";

const datas = [
	{
		id: 1,
		name: "Bonnet rouge",
		slug: "bonnet-rouge",
		illustration: "https://via.placeholder.com/500x500",
		subtitle: "Bonnet en laine rouge tissé a la main",
		description:
			"Maiores voluptate molestias nulla laborum voluptas ab omnis dicta facere, nostrum at fuga minus, debitis sit, quod fugit quaerat velit aliquid repellendus.",
		featured: false,
		price: "9.00 €",
		category: "Bonnets",
	},
	{
		id: 2,
		name: "Bonnet rouge",
		slug: "bonnet-rouge",
		illustration: "https://via.placeholder.com/500x500",
		subtitle: "Bonnet en laine rouge tissé a la main",
		description:
			"Maiores voluptate molestias nulla laborum voluptas ab omnis dicta facere, nostrum at fuga minus, debitis sit, quod fugit quaerat velit aliquid repellendus.",
		featured: true,
		price: "9.00 €",
		category: "Bonnets",
	},
	{
		id: 3,
		name: "Bonnet rouge",
		slug: "bonnet-rouge",
		illustration: "https://via.placeholder.com/500x500",
		subtitle: "Bonnet en laine rouge tissé a la main",
		description:
			"Maiores voluptate molestias nulla laborum voluptas ab omnis dicta facere, nostrum at fuga minus, debitis sit, quod fugit quaerat velit aliquid repellendus.",
		featured: false,
		price: "9.00 €",
		category: "Bonnets",
	},
];

const ProduitsTable = () => {
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
						<div className={styles.table__cell}>
							<div className={styles.product__name}>{item.name}</div>
						</div>
						<div className={styles.table__cell}>
							<div className={styles.product__illustration}>
								<img src={item.illustration} alt={item.name} />
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
									defaultChecked={item.featured}
									className={styles.product__featuredInput}
								/>
							</div>
						</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							<div className={styles.product__price}>{item.price}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.l_hide}`}>
							<div className={styles.product__category}>{item.category}</div>
						</div>
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
				<h3>Produits</h3>
				<div className={styles.table__create}>
					<button className="btn btn__create">
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
						<span>{items.length}</span>
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
