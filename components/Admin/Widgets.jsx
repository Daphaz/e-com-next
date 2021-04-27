import React from "react";
import styles from "../../styles/admin.module.scss";

const Widgets = ({ title, price, percent, img }) => {
	return (
		<div className={styles.widget}>
			<div className={styles.widget__wrap}>
				<div className={styles.widget__title}>{title}</div>
				<div className={styles.widget__price}>{price} €</div>
				<div className={styles.widget__percent}>
					{percent}% <span>cette semaine</span>
				</div>
			</div>
			<div className={styles.widget__icon}>{img}</div>
		</div>
	);
};

export default Widgets;
