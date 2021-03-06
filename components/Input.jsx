import React from "react";

const Input = ({
	children,
	label,
	type,
	name,
	handleChange,
	disabled,
	value,
	required,
	checked,
	ml,
	defaultOption,
	Options,
	placeholder,
}) => {
	switch (type) {
		case "email":
			return (
				<div className="form__group">
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<input
						type="email"
						name={name}
						id={name}
						value={value && value}
						onChange={handleChange}
						required={required}
					/>
					{children}
				</div>
			);
		case "password":
			return (
				<div className="form__group">
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<input
						type="password"
						name={name}
						id={name}
						value={value && value}
						onChange={handleChange}
						required={required}
					/>
					{children}
				</div>
			);
		case "text":
			return (
				<div className="form__group">
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<input
						type="text"
						name={name}
						id={name}
						onChange={handleChange}
						value={value && value}
						onChange={handleChange}
						required={required}
						disabled={disabled}
						placeholder={placeholder}
					/>
					{children}
				</div>
			);
		case "file":
			return (
				<div className="form__group">
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<input
						type="file"
						name={name}
						id={name}
						className="form__file"
						onChange={handleChange}
						value={value && value}
						onChange={handleChange}
						required={required}
					/>
					{children}
				</div>
			);
		case "textarea":
			return (
				<div className="form__group">
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<textarea
						name={name}
						id={name}
						onChange={handleChange}
						value={value && value}
						required={required}></textarea>
					{children}
				</div>
			);
		case "checkbox":
			return (
				<div className="form__group">
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<input
						type="checkbox"
						name={name}
						id={name}
						checked={checked && checked}
						onChange={handleChange}
					/>
					{children}
				</div>
			);
		case "number":
			return (
				<div className={`form__group ${ml && "ml"}`}>
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<input
						type="number"
						step="0.01"
						name={name}
						id={name}
						value={value && value}
						onChange={handleChange}
						required={required}
					/>
				</div>
			);
		case "select":
			return (
				<div className="form__group">
					<label htmlFor={name}>
						{label} {required && <span>*</span>}
					</label>
					<select name={name} id={name} onChange={handleChange}>
						<option value="none">{defaultOption}</option>
						{Options}
					</select>
					{children}
				</div>
			);

		default:
			return null;
	}
};

export default Input;
