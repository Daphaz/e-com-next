import React from "react";
import styles from "../../styles/admin.module.scss";
import AddOrder from "./../../public/icons/icon-document-add.svg";

const Orders = ({ commandes }) => {
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
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						Crée le
					</div>
					<div className={styles.table__cell}>Total</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Transport
					</div>
					<div className={styles.table__cell}>Status</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						xshb-shdr-dhez-sore
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						28 / 04 / 2021
					</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Colissimo
					</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__red}`}>
							Attente
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						xshb-shdr-dhez-sore
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						28 / 04 / 2021
					</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Colissimo
					</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__green}`}>
							Terminé
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						xshb-shdr-dhez-sore
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						28 / 04 / 2021
					</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Colissimo
					</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__yellow}`}>
							Préparation
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						xshb-shdr-dhez-sore
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						28 / 04 / 2021
					</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Colissimo
					</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__blue}`}>
							Livraison
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						xshb-shdr-dhez-sore
					</div>
					<div className={`${styles.table__cell} ${styles.sm_hide}`}>
						28 / 04 / 2021
					</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={`${styles.table__cell} ${styles.m_hide}`}>
						Colissimo
					</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__green}`}>
							Terminé
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Orders;
