import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import OrderVertical from "../../public/icons/icon-order-vertical.svg";
import IconAdd from "../../public/icons/icon-add.svg";
import Trash from "../../public/icons/icon-trash.svg";
import Edit from "../../public/icons/icon-edit.svg";
import Pagination from "../Pagination";
import Router from "next/router";

const CarouselTable = ({ carousels, deleteCarousel }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const itemsPerPage = 5;
	const pagesVisited = pageNumber * itemsPerPage;

	function displayItems() {
		return carousels
			.slice(pagesVisited, pagesVisited + itemsPerPage)
			.map((item) => {
				return (
					<div className={styles.table__row} key={item.id}>
						<div className={styles.table__cell}>
							<div className={styles.carousel__title}>{item.title}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.xl_hide}`}>
							<div className={styles.carousel__description}>{item.content}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							<div className={styles.carousel__titleBtn}>{item.btn_title}</div>
						</div>
						<div className={`${styles.table__cell} ${styles.l_hide}`}>
							<div className={styles.carousel__urlBtn}>{item.btn_url}</div>
						</div>
						<div className={styles.table__cell}>
							<div className={styles.carousel__illustration}>
								<img
									src={`${process.env.NEXT_PUBLIC_BASE_URL_API}/static/${item.illustration}`}
									alt={item.title}
								/>
							</div>
						</div>
						<div className={`${styles.table__cell} ${styles.table__btns}`}>
							<button
								className="btn btn__edit"
								onClick={() => handleEdit(item.id)}>
								<Edit />
							</button>
							<button
								className="btn btn__delete"
								onClick={() => deleteCarousel(item.id)}>
								<Trash />
							</button>
						</div>
					</div>
				);
			});
	}

	const pageCount = Math.ceil(carousels.length / itemsPerPage);

	function changePage({ selected }) {
		setPageNumber(selected);
	}

	function handleCreate() {
		Router.push("/gestion/carousel/create");
	}

	function handleEdit(id) {
		Router.push(`/gestion/carousel/edit/${id}`);
	}

	return (
		<div className={styles.admin__table}>
			<div className={styles.table__header}>
				<h3>Carousel</h3>
				<div className={styles.table__create}>
					<button className="btn btn__create" onClick={handleCreate}>
						<IconAdd />
						Cr??er une slide
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
						<span>{carousels.length}</span>
						<p>r??sultats</p>
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
