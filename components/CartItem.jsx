import React from "react";
import { priceFormatted } from "../helpers";

const CartItem = ({ item }) => {
	return (
		<>
			{item && (
				<tr className="table_item">
					<td>
						<div
							className="table_img"
							style="background-image: url('/uploads/{{ item.product.illustration }}');"></div>
					</td>
					<td>
						<div className="table_desciption">
							<span>{item.name}</span>
							<span>{item.subtitle}</span>
						</div>
					</td>
					<td>{priceFormatted(item.price)}</td>
					<td className="table_quantity">
						<a href="#" className="btn btn_quantity">
							-
						</a>
						<p>{item.quantity}</p>
						<a href="#" className="btn btn_quantity">
							+
						</a>
					</td>
					<td>{priceFormatted(item.quantity * item.price)}</td>
					<td>
						<a href="#" className="btn btn_close">
							trash
						</a>
					</td>
				</tr>
			)}
		</>
	);
};

export default CartItem;
