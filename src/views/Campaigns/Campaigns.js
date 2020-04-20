import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from "reactstrap";
import { frontendRoutes, backendRoutes } from '../../utils/constants';
import CustomPagination from '../../customComponents/CustomPagination';
import { convertFilterObjects, convertKeysToNames } from '../../utils/converters';
import { apiPost } from '../../utils/serviceManager';

const RemoteSort = props => (
  <div>
    <BootstrapTable
      remote={{ sort: true, filter: true }}
      bootstrap4
      // remote
      keyField="id"
      data={props.data}
      columns={props.columns}
      //pagination={paginationFactory({ page: props.page, sizePerPage: props.sizePerPage, totalSize: props.totalSize })}
      filter={filterFactory()}
      onTableChange={props.onTableChange}
    />
  </div>
);

export default function Campaigns(props) {
  const [columns, setColumns] = useState([]);
  const [row, setRow] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [sizePerPage, setSizePerPage] = useState(10)
  const [totalRecords, setTotalRecords] = useState(0)
  // const [query, setQuery] = {}

  function ActionColumn(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <Button
          color="light"
          onClick={() => {
            props.history.push({
              pathname: frontendRoutes.editCampaigns.path,
              state: { data: row },
            });
          }}
        >
          Edit
        </Button>
      </div>
    );
  }

  function getCampaignsLength() {
    apiPost(
      backendRoutes.CAMPAIGN + 'count',
      {},
      { "Content-Type": "application/json" },
      successRes => {
        console.log("Total campaigns: ", successRes)
        setTotalRecords(successRes.data.data)
      },
      errorRes => {
        console.log("error in Total campaigns api: ", errorRes)
      }
    )
  }


  function getCampaigns(query, startIndex, endIndex) {
    apiPost(
      backendRoutes.CAMPAIGN + 'get',
      query,
      {
        "Content-Type": "application/json",
      },
      response => {
        // console.log("Api response: ", response)
        let apiData = response.data.data;
        let columnData = Object.keys(apiData[0])
          .filter(
            (key) =>
              // key !== "createdAt" &&
              // key !== "updatedAt" &&
              key !== "OwnerId"
            // key !== "campaign_id"
            //   key !== "Owner" &&
            //   key !== "Monitor"
          )
          .map((key) => {
            return {
              dataField: key,
              // text: key,
              text: convertKeysToNames(key),
              sort: true,
              filter: textFilter()
              // filter: textFilter({
              //   // configuration options for filter
              //   placeholder: " ",
              // }),
            };
          });
        columnData.push({
          formatter: ActionColumn,
          // headerAttrs: { width: 50 },
          // attrs: { width: 50, class: "EditRow" },
          text: "Actions",
          // headerStyle: { width: "50px" },
          // style: { height: "30px" }
        });

        setColumns(columnData);
        setRow(apiData);

      },
      error => {
        console.log("Api error: ", error)
      }
    )
  }

  useEffect(() => {
    getCampaignsLength()
    getCampaigns(
      {
        "pagination": {
          "page": currentPage,
          "page_size": sizePerPage
        }
      }
    )
  }, [])



  const handleTableChange = (type, { sortField, sortOrder, data, filters }) => {
    console.log("Operation type: ", type)
    console.log("sort props: ", { sortField, sortOrder, data, filters })


    if (type === 'filter') {

      let filterQuery = convertFilterObjects(filters)
      console.log("filterQuery: ", filterQuery)

      getCampaigns(
        {
          "pagination": {
            "page": currentPage,
            "page_size": sizePerPage
          },
          filter: filterQuery
        }

      )

    }

    // if (type === 'pagination') {
    //   const currentIndex = (page - 1) * sizePerPage;
    //   console.log("Current index: ", currentIndex)
    //   getCampaigns(
    //     {
    //       "pagination": {
    //         "page": page,
    //         "page_size": sizePerPage,

    //       }
    //     },
    //     currentIndex,
    //     currentIndex + sizePerPage
    //   )
    // }

    if (type === 'sort') {
      let result;
      if (sortOrder === 'asc') {

        getCampaigns(
          {
            "pagination": {
              "page": currentPage,
              "page_size": sizePerPage
            },
            "order": [
              {
                "desc": false,
                "name": sortField
              }
            ]
          }
        )
      } else {
        getCampaigns(
          {
            "pagination": {
              "page": currentPage,
              "page_size": sizePerPage
            },
            "order": [
              {
                "desc": true,
                "name": sortField
              }
            ]
          }
        )
      }
    }

  }



  const displayTable = () => {
    if (columns.length > 0 || row.length > 0) {
      return (
        <RemoteSort
          data={row}
          columns={columns}
          onTableChange={handleTableChange}
          page={currentPage}
          sizePerPage={sizePerPage}
          totalSize={14}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  const handleSizePerPage = (pageSize) => {
    // e.preventDefault();
    // let selected = data.selected;
    // let offset = Math.ceil(selected * sizePerPage);
    setSizePerPage(() => {
      setCurrentPage(1)
      getCampaigns(
        {
          "pagination": {
            "page": 1,
            "page_size": pageSize
          }
        }
      )
      return pageSize
    })
  };

  const handlePageClick = (e, i) => {
    e.preventDefault();
    // let selected = data.selected;
    // let offset = Math.ceil(selected * sizePerPage);
    setCurrentPage(() => {
      getCampaigns(
        {
          "pagination": {
            "page": i,
            "page_size": sizePerPage
          }
        }
      )
      return i
    })
  };

  const handlePreviousClick = (e) => {
    setCurrentPage(() => {
      getCampaigns(
        {
          "pagination": {
            "page": currentPage - 1,
            "page_size": sizePerPage
          }
        }
      )
      return currentPage - 1
    })
  }

  const handleNextClick = (e) => {
    setCurrentPage(() => {
      getCampaigns(
        {
          "pagination": {
            "page": currentPage + 1,
            "page_size": sizePerPage
          }
        }
      )
      return currentPage + 1
    })
  }

  return (
    <Container fluid={true}>
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
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
              <CardBody>{displayTable()}</CardBody>
              <CardFooter>
                {/* {renderPagination(totalRecords, sizePerPage, currentPage)} */}
                <CustomPagination
                  totalRecords={totalRecords}
                  pageLimit={sizePerPage}
                  pageNeighbors={0}
                  currentPage={currentPage}
                  handlePageClick={handlePageClick}
                  handleNextClick={handleNextClick}
                  handlePreviousClick={handlePreviousClick}
                  handleSizePerPage={handleSizePerPage}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )

}

