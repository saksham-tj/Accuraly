import React, { useEffect, useState } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from 'axios';
import { Table, Pagination, PaginationItem, PaginationLink, Badge, Card, CardBody, CardHeader, Col, Button, } from 'reactstrap';
import { frontendRoutes } from '../../utils/constants';

function ReactTable(
  {
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    otherProps
  }
) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1 },
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

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
              otherProps.history.push(frontendRoutes.createCampaigns.path);
            }}
          >
            Create Campaign
                </Button>
          {/* <Link to={frontendRoutes.createMonitor.path}>Create Monitor</Link> */}
        </CardHeader>
        <CardBody>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
          <Table
            responsive
            hover
            bordered
            striped
            //dark  
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    // style={{
                    //   borderBottom: 'solid 3px red',
                    //   background: 'aliceblue',
                    //   color: 'black',
                    //   fontWeight: 'bold',
                    // }}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}
                      // style={{
                      //   padding: '10px',
                      //   border: 'solid 1px gray',
                      //   background: 'papayawhip',
                      // }}
                      >
                        {cell.render('Cell')}
                      </td>
                    })}
                  </tr>
                )
              })}
              <tr>
                {loading ? (
                  // Use our custom loading state to show a loading indicator
                  <td colSpan="10000">Loading...</td>
                ) : (
                    <td colSpan="10000">
                      Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
                    </td>
                  )}
              </tr>
            </tbody>
          </Table>
          {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          {/* <Pagination>
                <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                <PaginationItem active>
                  <PaginationLink tag="button">1</PaginationLink>
                </PaginationItem>
                <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
              </Pagination> */}
        </CardBody>
      </Card>
    </Col>
  )
}

export default function Campaigns3(props) {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)



  function getCampaigns(pageSize, pageIndex) {

    const fetchId = ++fetchIdRef.current
    setLoading(true)

    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex
      const endRow = startRow + pageSize


      axios({
        baseURL: 'http://core.skipquest.com/',
        url: 'campaign/get',
        headers: {
          "Content-Type": "application/json",
        },
        method: 'POST',
        data: {
          "pagination": {
            "page": startRow,
            "page_size": 10
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
        setData(apiData);
        setPageCount(2)
        console.log("Api data: ", apiData)
      }).catch((error) => {
        console.log("Api error: ", error)
      })
    }
  }


  useEffect(() => {
    getCampaigns()
  }, [])

  // const displayTable = () => {
  //   if (columns.length > 0) {
  //     return (
  //       <ReactTable 

  //       />
  //     );
  //   } else {
  //     return <div>No data found</div>;
  //   }
  // };

  return (
    <di>
      {/* {displayTable()} */}

      <ReactTable
        columns={columns}
        data={data}
        fetchData={getCampaigns}
        loading={loading}
        pageCount={pageCount}
        otherProps={props}
      />

      <Col xs="12" lg="6">
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
            {/* <Link to={frontendRoutes.createMonitor.path}>Create Monitor</Link> */}
          </CardHeader>
          <CardBody>
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Date registered</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pompeius René</td>
                  <td>2012/01/01</td>
                  <td>Member</td>
                  <td>
                    <Badge color="success">Active</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Paĉjo Jadon</td>
                  <td>2012/02/01</td>
                  <td>Staff</td>
                  <td>
                    <Badge color="danger">Banned</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Micheal Mercurius</td>
                  <td>2012/02/01</td>
                  <td>Admin</td>
                  <td>
                    <Badge color="secondary">Inactive</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Ganesha Dubhghall</td>
                  <td>2012/03/01</td>
                  <td>Member</td>
                  <td>
                    <Badge color="warning">Pending</Badge>
                  </td>
                </tr>
                <tr>
                  <td>Hiroto Šimun</td>
                  <td>2012/01/21</td>
                  <td>Staff</td>
                  <td>
                    <Badge color="success">Active</Badge>
                  </td>
                </tr>
              </tbody>
            </Table>
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
          </CardBody>
        </Card>
      </Col>

    </di>
  )
}


