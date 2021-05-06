import React, { useState } from "react";
import styles from "../../styles/admin.module.scss";
import OrderVertical from "../../public/icons/icon-order-vertical.svg";
import UserAdd from "../../public/icons/icon-user-add.svg";
import Trash from "../../public/icons/icon-trash.svg";
import Edit from "../../public/icons/icon-edit.svg";
import Pagination from "../Pagination";
import Router from "next/router";

const ClientsTable = ({ users, deleteUser }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const usersPerPage = 5;
	const pagesVisited = pageNumber * usersPerPage;

	function displayUsers() {
		return users
			.slice(pagesVisited, pagesVisited + usersPerPage)
			.map((user, i) => {
				return (
					<div className={styles.table__row} key={user.id}>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							{i + 1}
						</div>
						<div className={styles.table__cell}>{user.email}</div>
						<div className={`${styles.table__cell} ${styles.m_hide}`}>
							{user.firstname}
						</div>
						<div className={`${styles.table__cell} ${styles.sm_hide}`}>
							{user.lastname}
						</div>
						<div className={`${styles.table__cell} ${styles.sm_hide}`}>
							{user.roles}
						</div>
						<div className={`${styles.table__cell} ${styles.table__btns}`}>
							<button
								className="btn btn__edit"
								onClick={() => handleEdit(user.id)}>
								<Edit />
							</button>
							{user.roles !== "admin" && (
								<button
									className="btn btn__delete"
									onClick={() => deleteUser(user.id)}>
									<Trash />
								</button>
							)}
						</div>
					</div>
				);
			});
	}

	const pageCount = Math.ceil(users.length / usersPerPage);

	function changePage({ selected }) {
		setPageNumber(selected);
	}

	function handleCreate() {
		Router.push("/gestion/clients/create");
	}

	function handleEdit(id) {
		Router.push(`/gestion/clients/edit/${id}`);
	}

	return (
		<div className={styles.admin__table}>
			<div className={styles.table__header}>
				<h3>Clients</h3>
				<div className={styles.table__create}>
					<button className="btn btn__create" onClick={handleCreate}>
						<UserAdd />
						Créer un utilisateur
					</button>
				</div>
			</div>
			<div className={styles.table}>
				<div className={`${styles.table__row} ${styles.table__head}`}>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						ID <OrderVertical />
					</div>
					<div className={styles.table__cell}>
						Email <OrderVertical />
					</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Prénom <OrderVertical />
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						Nom <OrderVertical />
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						Roles <OrderVertical />
					</div>
					<div className={styles.table__cell}></div>
				</div>
				{displayUsers()}
				<div className={styles.table__footer}>
					<div className={styles.table__cell}>
						<span>{users.length}</span>
						<p>résultats</p>
					</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}></div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}></div>
					<div className={styles.table__cell}>
						<Pagination changePage={changePage} pageCount={pageCount} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClientsTable;
