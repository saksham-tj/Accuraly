import React, { useState } from 'react'
import {
	Pagination,
	PaginationItem,
	PaginationLink,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

export default function CustomPagination(props) {

	// const [currentPage, setCurrentPage] = useState(1)
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);


	const totalPages = Math.ceil(props.totalRecords / props.pageLimit);

	const handleDropDown = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};


	return (
		<div className="d-flex flex-row justify-content-between align-items-center">
			<Dropdown isOpen={isDropDownOpen} toggle={handleDropDown}>
				<DropdownToggle caret>
					{props.pageLimit}
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem onClick={() =>
						props.handleSizePerPage(5)
					}>5</DropdownItem>
					<DropdownItem onClick={() =>
						props.handleSizePerPage(10)
					}>10</DropdownItem>
					<DropdownItem onClick={() =>
						props.handleSizePerPage(20)
					}>20</DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<div className='align-justify'>
				<Pagination>
					<PaginationItem disabled={props.currentPage <= 1}>
						<PaginationLink previous tag="button" onClick={props.handlePreviousClick}>Prev</PaginationLink>
					</PaginationItem>
					{[...Array(totalPages)].map((page, i) => (
						<PaginationItem active={i + 1 === props.currentPage} key={i + 1}>
							<PaginationLink onClick={e => props.handlePageClick(e, i + 1)} href="#">
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem disabled={props.currentPage === totalPages}>
						<PaginationLink next tag="button" onClick={props.handleNextClick}>Next</PaginationLink>
					</PaginationItem>
				</Pagination>
			</div>

		</div>

	)
}
