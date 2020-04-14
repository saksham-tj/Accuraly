import React, { Component, lazy, Suspense } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  ButtonDropdown,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from "reactstrap";

function Dashboard() {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-info">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <ButtonDropdown id="card1">
                  <DropdownToggle caret className="p-0" color="transparent">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem disabled>Disabled action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
              <div className="text-value">9.823</div>
              <div>Campaigns online</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
              {/* <Line data={cardChartData2} options={cardChartOpts2} height={70} /> */}
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-primary">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Dropdown id="card2">
                  <DropdownToggle className="p-0" color="transparent">
                    <i className="icon-location-pin"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
              <div className="text-value">9.823</div>
              <div>Members online</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
              {/* <Line data={cardChartData1} options={cardChartOpts1} height={70} /> */}
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-warning">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <Dropdown id="card3">
                  <DropdownToggle caret className="p-0" color="transparent">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonGroup>
              <div className="text-value">9.823</div>
              <div>Members online</div>
            </CardBody>
            <div className="chart-wrapper" style={{ height: "70px" }}>
              {/* <Line data={cardChartData3} options={cardChartOpts3} height={70} /> */}
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="3">
          <Card className="text-white bg-danger">
            <CardBody className="pb-0">
              <ButtonGroup className="float-right">
                <ButtonDropdown>
                  <DropdownToggle caret className="p-0" color="transparent">
                    <i className="icon-settings"></i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Action</DropdownItem>
                    <DropdownItem>Another action</DropdownItem>
                    <DropdownItem>Something else here</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
              <div className="text-value">9.823</div>
              <div>Members online</div>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
              {/* <Bar data={cardChartData4} options={cardChartOpts4} height={70} /> */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
