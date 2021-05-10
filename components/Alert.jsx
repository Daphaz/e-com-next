import React, { useEffect } from "react";
import IconClose from "../public/icons/icon-close.svg";
import useAlert from "../constants/alert";

const Alert = () => {
	const { alertState, setAlertState } = useAlert();

	useEffect(() => {
		const timer = setTimeout(() => {
			setAlertState((prevState) => ({ ...prevState, close: false }));
		}, 7000);

		return () => clearTimeout(timer);
	}, []);

	function handleClick() {
		setAlertState({ ...alertState, close: false });
	}

	return (
		<>
			{alertState.close && (
				<div className={`alert alert__${alertState.type}`}>
					<h5 className="h5">{alertState.title}</h5>
					<div className="divider"></div>
					<p className="articles_body">{alertState.text}</p>
					<div className="close" onClick={handleClick}>
						<IconClose />
					</div>
					<div className="loading_bg">
						<div className="loading"></div>
					</div>
				</div>
			)}
		</>
	);
};

export default Alert;
