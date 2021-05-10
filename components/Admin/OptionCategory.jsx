import React from "react";

const OptionCategory = ({ category }) => {
	return (
		<>
			{category &&
				category.map((cat) => (
					<option value={cat.name} key={cat.id}>
						{cat.name}
					</option>
				))}
		</>
	);
};

export default OptionCategory;
