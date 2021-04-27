import React from "react";
import styles from "../../styles/admin.module.scss";

const Orders = () => {
	return (
		<div className={styles.admin__orders}>
			<h2>Commandes récentes</h2>
			<div className={styles.table}>
				<div className={`${styles.table__row} ${styles.table__head}`}>
					<div className={styles.table__cell}>Client</div>
					<div className={styles.table__cell}>Référence</div>
					<div className={styles.table__cell}>Crée le</div>
					<div className={styles.table__cell}>Total</div>
					<div className={styles.table__cell}>Transport</div>
					<div className={styles.table__cell}>Status</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={styles.table__cell}>xshb-shdr-dhez-sore</div>
					<div className={styles.table__cell}>28 / 04 / 2021</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={styles.table__cell}>Colissimo</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__red}`}>
							Attente
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={styles.table__cell}>xshb-shdr-dhez-sore</div>
					<div className={styles.table__cell}>28 / 04 / 2021</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={styles.table__cell}>Colissimo</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__green}`}>
							Terminé
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={styles.table__cell}>xshb-shdr-dhez-sore</div>
					<div className={styles.table__cell}>28 / 04 / 2021</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={styles.table__cell}>Colissimo</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__yellow}`}>
							Préparation
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={styles.table__cell}>xshb-shdr-dhez-sore</div>
					<div className={styles.table__cell}>28 / 04 / 2021</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={styles.table__cell}>Colissimo</div>
					<div className={styles.table__cell}>
						<span className={`${styles.badge} ${styles.badge__blue}`}>
							Livraison
						</span>
					</div>
				</div>
				<div className={styles.table__row}>
					<div className={styles.table__cell}>Jhon Doe</div>
					<div className={styles.table__cell}>xshb-shdr-dhez-sore</div>
					<div className={styles.table__cell}>28 / 04 / 2021</div>
					<div className={styles.table__cell}>458.95 €</div>
					<div className={styles.table__cell}>Colissimo</div>
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
