import React from "react";

const FormErrors = ({ error }) => {
	return <>{error && <div className="alert alert__danger">{error}</div>}</>;
};

export default FormErrors;
