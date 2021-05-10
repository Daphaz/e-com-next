import React, { useContext, createContext, useState } from "react";

const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
	const [alertState, setAlertState] = useState({
		close: false,
		title: "",
		text: "",
		type: "",
	});

	return (
		<AlertContext.Provider
			value={{
				alertState,
				setAlertState,
			}}>
			{children}
		</AlertContext.Provider>
	);
};

export default function useAlert() {
	return useContext(AlertContext);
}
