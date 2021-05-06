import React from "react";
import Widget from "./Widgets";
import Trend from "../../public/icons/icon-trending-up.svg";
import Euro from "../../public/icons/icon-currency-euro.svg";
import Basket from "../../public/icons/icon-shopping-basket.svg";
import styles from "../../styles/admin.module.scss";

const datas = [
	{
		title: "Total ventes",
		price: "1500",
		percent: "35",
		positive: true,
		img: <Trend />,
	},
	{
		title: "Total revenus",
		price: "4824",
		percent: "40",
		positive: true,
		img: <Euro />,
	},
	{
		title: "Panier moyen",
		price: "45",
		percent: "15",
		positive: true,
		img: <Basket />,
	},
];

const ListWidgets = () => {
	return (
		<header className={styles.widget__list}>
			{datas.map((item, i) => {
				return (
					<Widget
						key={i}
						title={item.title}
						price={item.price}
						percent={item.percent}
						img={item.img}
						positive={item.positive}
					/>
				);
			})}
		</header>
	);
};

export default ListWidgets;
