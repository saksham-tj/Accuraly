import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Form,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Button,
  FormFeedback,
  Alert,
} from "reactstrap";
import { useInput, useSubmit } from "../../hooks/form";
import { handleValidation, validations } from "../../utils/validations";
import { backendRoutes, frontendRoutes, messages, userTypes } from "../../utils/constants";
import axios from "axios";
import { apiPost, apiGet } from "../../utils/serviceManager";
import useAlert from "../../hooks/useAlert";

export default function CreateCampaign(props) {
  let name, description;

  name = useInput("name", "", handleValidation, validations.EMPTY);
  description = useInput("description", "", handleValidation, validations.EMPTY);

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const alert = useAlert(false);
  const submit = useSubmit([name, description], handleSuccess);

  function handleSuccess(formData) {
    formData = {...formData, start: startDate.toISOString(), end: endDate.toISOString()}
    console.log("Data Length==> ", formData);
    createCampaign(formData)
    name.clearInput();
    description.clearInput();
    setStartDate(new Date())
    setEndDate(new Date())
  }

  function handleAlertVisibility() {
    alert.changeVisibility(false);
  }

  function createCampaign(formData) {
    apiPost(
      backendRoutes.CAMPAIGN + 'insert',
      {data: formData},
      {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      successRes => {
        console.log("campaign creation success: ", successRes);
        alert.changeVisibility(true);
        alert.handleMessage("campaign creation success");
        setTimeout(() => {
          alert.changeVisibility(false);
        }, 5000);
      },
      errorRes => {
        console.log("campaign creation error: ", errorRes);
        if (errorRes.response && errorRes.response.data) {
          alert.handleMessage(errorRes.response.data.message);
        } else {
          alert.handleMessage(messages.NETWORK_FAILURE);
        }
        setTimeout(() => {
          alert.changeVisibility(false);
        }, 5000);
      }
    )
  }

  function handleStartDate(date) {
    console.log("Start date selected: ", date.toISOString())
    setStartDate(date)
  }

  function handleEndDate(date) {
    console.log("End date selected: ", date.toISOString())
    setEndDate(date)
  }



  useEffect(() => {

  }, []);



  return (
    <div className="animated fadeIn" >
      <Row>
        <Col xl="8">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Campaign{" "}
              <small className="text-muted">creation form</small>
            </CardHeader>
            <CardBody>
              <Alert
                color="danger"
                isOpen={alert.isVisible}
                toggle={handleAlertVisibility}
              >
                {alert.message}
              </Alert>
              <Form noValidate {...submit.props}>
                <h1>Register</h1>
                <p className="text-muted">Create a campaign</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Name"
                    autoComplete="on"
                    {...name.props}
                  />
                  <FormFeedback>{name.helperText}</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-info"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Description"
                    autoComplete="off"
                    {...description.props}
                  />
                  <FormFeedback>{description.helperText}</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-calendar"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDate}
                    showTimeSelect
                  //dateFormat="ISO"
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-calendar"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDate}
                    showTimeSelect
                  //dateFormat="ISO"
                  />
                </InputGroup>
                <Button color="success" block>
                  Create Campaign
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
