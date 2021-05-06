import dateFormat from "dateformat";

export const dateCreatedAt = (date) => {
	dateFormat.masks.createdAt = "dd/mm/yy";
	return dateFormat(date, "createdAt");
};
