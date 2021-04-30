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
		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		description:
			"Maiores voluptate molestias nulla laborum voluptas ab omnis dicta facere, nostrum at fuga minus, debitis sit, quod fugit quaerat velit aliquid repellendus.",
		titleBtn: "Nouvelle collection",
		urlBtn: "http://localhost:3001/",
		illustration: "https://via.placeholder.com/500x500",
	},
	{
		id: 2,
		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		description:
			"Maiores voluptate molestias nulla laborum voluptas ab omnis dicta facere, nostrum at fuga minus, debitis sit, quod fugit quaerat velit aliquid repellendus.",
		titleBtn: "Nouvelle collection",
		urlBtn: "http://localhost:3001/",
		illustration: "https://via.placeholder.com/500x500",
	},
	{
		id: 3,
		title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
		description:
			"Maiores voluptate molestias nulla laborum voluptas ab omnis dicta facere, nostrum at fuga minus, debitis sit, quod fugit quaerat velit aliquid repellendus.",
		titleBtn: "Nouvelle collection",
		urlBtn: "http://localhost:3001/",
		illustration: "https://via.placeholder.com/500x500",
	},
];

const CarouselTable = () => {
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
							<div className={styles.carousel__title}>{item.title}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.xl_hide}`}>
							<div className={styles.carousel__description}>
								{item.description}
							</div>
						</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							<div className={styles.carousel__titleBtn}>{item.titleBtn}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.l_hide}`}>
							<div className={styles.carousel__urlBtn}>{item.urlBtn}</div>
						</div>
						<div className={styles.table__cell}>
							<div className={styles.carousel__illustration}>
								<img src={item.illustration} alt={item.title} />
							</div>
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
				<h3>Carousel</h3>
				<div className={styles.table__create}>
					<button className="btn btn__create">
						<IconAdd />
						Créer une slide
					</button>
				</div>
			</div>
			<div className={styles.table}>
				<div className={`${styles.table__row} ${styles.table__head}`}>
					<div className={styles.table__cell}>
						Titre <OrderVertical />
					</div>
					<div className={`${styles.table__cell} ${styles.xl_hide}`}>
						Description
					</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						titre bouton <OrderVertical />
					</div>
					<div className={`${styles.table__cell} ${styles.l_hide}`}>
						url du bouton
					</div>
					<div className={styles.table__cell}>illustration</div>
					<div className={styles.table__cell}></div>
				</div>
				{displayItems()}
				<div className={styles.table__footer}>
					<div className={styles.table__cell}>
						<span>{items.length}</span>
						<p>résultats</p>
					</div>
					<div className={`${styles.table__cell} ${styles.xl_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.l_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}></div>
					<div className={`${styles.table__cell}`}></div>
					<div className={styles.table__cell}>
						<Pagination changePage={changePage} pageCount={pageCount} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarouselTable;
