import React, { useState, useEffect } from 'react'
import { Table, Pagination, PaginationItem, PaginationLink, Badge, Card, CardBody, CardHeader, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';
import { frontendRoutes } from '../../utils/constants';
import axios from 'axios';

export default function Campaigns4(props) {

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);


	const [columns, setColumns] = useState([])
	const [apiData, setApiData] = useState([])
	const [pageSize, setPageSize] = useState(10)
	const [pageNum, setPageNum] = useState(1)

	function getCampaigns() {
		axios({
			baseURL: 'http://core.skipquest.com/',
			url: 'campaign/get',
			headers: {
				"Content-Type": "application/json",
			},
			method: 'POST',
			data: {
				pagination: {
					page: pageNum,
					page_size: pageSize
				}
			},
		}).then((response) => {
			console.log("Api response: ", response)
			let apiData = response.data.data;
			let columnData = Object.keys(apiData[0])
				.filter(
					(key) =>
						key !== "createdAt" &&
						key !== "updatedAt" &&
						key !== "OwnerId" &&
						key !== "MonitorId"
					//   key !== "Owner" &&
					//   key !== "Monitor"
				)
				.map((key) => {
					return {
						Header: key,
						accessor: key,
					};
				});


			setColumns(columnData);
			setApiData(apiData);
			console.log("Api data: ", apiData)
			console.log("Columns data: ", columnData)
		}).catch((error) => {
			console.log("Api error: ", error)
		})
	}

	useEffect(() => {
		getCampaigns()

	}, [pageSize, pageNum])

	function sortColumns() {

	}

	function tableHeader() {
		return (
			<thead>
				<tr>
					{
						columns.map((data, index) => {
							return (
								<th
									key={index}
								//onClick={}
								>
									{data.Header}
								</th>
							)
						})
					}
				</tr>
			</thead>
		)
	}

	function tableBody() {
		return (
			<tbody>
				{
					apiData.map((rowData, i) => {
						return (
							<tr>
								<td>{rowData.campaign_id} </td>
								<td>{rowData.name} </td>
								<td>{rowData.description} </td>
								<td>{rowData.start_time} </td>
								<td>{rowData.end_time} </td>
							</tr>

						)
					})
				}

			</tbody>
		)
	}

	function renderTable() {
		if (apiData.length > 0) {
			return (
				<Table responsive bordered>
					{tableHeader()}
					{tableBody()}
				</Table>
			)
		}
		return (
			<div>
				Loading...
			</div>
		)
	}

	const handleDropDown = () => {
		setIsDropDownOpen(!isDropDownOpen);
	};

	const handleDropdownItem = length => {
		console.log("Page length: ", length)
		setPageSize(length)
	};

	function renderPagination() {
		return (
			<div className="d-flex flex-row justify-content-between align-items-center">
				<Dropdown isOpen={isDropDownOpen} toggle={handleDropDown}>
					<DropdownToggle caret>
						{pageSize}
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={() =>
							handleDropdownItem(5)
						}>5</DropdownItem>
						<DropdownItem onClick={() =>
							handleDropdownItem(10)
						}>10</DropdownItem>
						<DropdownItem onClick={() =>
							handleDropdownItem(20)
						}>20</DropdownItem>
					</DropdownMenu>
				</Dropdown>


				<Pagination>
					<PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
					<PaginationItem active>
						<PaginationLink tag="button">1</PaginationLink>
					</PaginationItem>
					<PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
					<PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
					<PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
					<PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
				</Pagination>
			</div>

		)
	}


	return (
		<Col xs="12" lg="12">
			<Card>
				<CardHeader className="d-flex flex-row justify-content-between align-items-center">
					<div>
						<i className="fa fa-align-justify"></i> Campaigns list
                  {/* <small className="text-muted">list</small> */}
					</div>
					<Button
						color="success"
						onClick={() => {
							props.history.push(frontendRoutes.createCampaigns.path);
						}}
					>
						Create Campaign
          </Button>
				</CardHeader>
				<CardBody>
					{renderTable()}
					{renderPagination()}
				</CardBody>
			</Card>
		</Col>
	)
}
