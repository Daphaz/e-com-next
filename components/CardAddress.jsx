import React from "react";
import IconTrash from "../public/icons/icon-trash.svg";

const CardAddress = ({ address, handleDelete }) => {
	return (
		<div className="card">
			<div className="card_header">
				<h5 className="h6">{address.name}</h5>
			</div>
			<div className="card_body">
				<p className="card_name">
					{address.firstname} {address.lastname}
				</p>
				<p className="card_text">
					{address.address},<br />
					{address.postal} - {address.city} - {address.country}
				</p>
			</div>
			<div className="card_footer">
				<a
					href={`/compte/addresses/edit/${address.id}`}
					className="btn btn_card">
					Modifier
				</a>
				<button
					className="btn btn__close"
					onClick={() => handleDelete(address.id)}>
					<IconTrash />
				</button>
			</div>
		</div>
	);
};

export default CardAddress;
