import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, changePage }) => {
	return (
		<ReactPaginate
			previousLabel={""}
			nextLabel={""}
			pageCount={pageCount}
			onPageChange={changePage}
			containerClassName={"pagination"}
			previousLinkClassName={"pagination__prevBtn"}
			nextLinkClassName={"pagination__nextBtn"}
			disabledClassName={"pagination__disabled"}
			activeClassName={"pagination__active"}
			breakLabel={"..."}
		/>
	);
};

export default Pagination;
