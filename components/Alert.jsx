import React from "react";

const Alert = ({ type, message, title }) => {
	switch (type) {
		case "info":
			return (
				<div className="alert alert-info">
					<h4>{title}</h4>
					<p>{message}</p>
				</div>
			);
		case "sucess":
			return (
				<div className="alert alert-sucess">
					<h4>{title}</h4>
					<p>{message}</p>
				</div>
			);
		case "danger":
			return (
				<div className="alert alert-danger">
					<h4>{title}</h4>
					<p>{message}</p>
				</div>
			);
		case "warning":
			return (
				<div className="alert alert-warning">
					<h4>{title}</h4>
					<p>{message}</p>
				</div>
			);

		default:
			return null;
	}
};

export default Alert;
