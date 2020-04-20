import React, { useEffect, useState } from "react";
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
import { apiPost, apiGet } from "../../utils/serviceManager";
import useAlert from "../../hooks/useAlert";

export default function CreateAd(props) {
  let name, vastUrl, width, height;

  name = useInput("name", "", handleValidation, validations.EMPTY);
  vastUrl = useInput("vast_url", "", handleValidation, validations.EMPTY);
  width = useInput("width", "", handleValidation, validations.NUMBER);
  height = useInput("height", "", handleValidation, validations.NUMBER);

  const alert = useAlert(false);
  const submit = useSubmit([name, vastUrl, height, width], handleSuccess);

  function handleSuccess(formData) {
    formData = {...formData, height: parseInt(formData.height), width: parseInt(formData.width)}
    console.log("Data Length==> ", formData);
    createAds(formData)
    name.clearInput();
    vastUrl.clearInput();
    height.clearInput();
    width.clearInput();
  }

  function handleAlertVisibility() {
    alert.changeVisibility(false);
  }

  function createAds(formData) {
    apiPost(
      backendRoutes.ADS + 'insert',
      {data: formData},
      {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      successRes => {
        console.log("Ad creation success: ", successRes);
        alert.changeVisibility(true);
        alert.handleMessage("Ad created successfully.");
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



  return (
    <div className="animated fadeIn" >
      <Row>
        <Col xl="8">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Ads{" "}
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
                <p className="text-muted">Create an Ad</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-screen-desktop"></i>
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
                      <i className="icon-calendar"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Vast url"
                    autoComplete="off"
                    {...vastUrl.props}
                  />
                  <FormFeedback>{vastUrl.helperText}</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-chart"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Ad Width"
                    autoComplete="off"
                    {...width.props}
                  />
                  <FormFeedback>{width.helperText}</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-chart"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Ad Height"
                    autoComplete="off"
                    {...height.props}
                  />
                  <FormFeedback>{height.helperText}</FormFeedback>
                </InputGroup>
                <Button color="success" block>
                  Create Ad
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
