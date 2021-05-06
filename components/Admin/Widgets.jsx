import React from "react";
import styles from "../../styles/admin.module.scss";
import ArrowDown from "../../public/icons/icon-arrow-thin-down-circle.svg";
import ArrowUp from "../../public/icons/icon-arrow-thin-up-circle.svg";

const Widgets = ({ title, price, percent, img, positive }) => {
	return (
		<div className={styles.widget}>
			<div className={styles.widget__wrap}>
				<div className={styles.widget__title}>{title}</div>
				<div className={styles.widget__price}>{price} €</div>
				<div className={styles.widget__percent}>
					{positive ? (
						<p className={styles.widget__positive}>
							<ArrowUp />+{percent}%
						</p>
					) : (
						<p className={styles.widget__negative}>
							<ArrowDown />-{percent}%
						</p>
					)}
					<span>cette semaine</span>
				</div>
			</div>
			<div className={styles.widget__icon}>{img}</div>
		</div>
	);
};

export default Widgets;
