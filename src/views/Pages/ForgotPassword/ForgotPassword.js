import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormFeedback,
  Alert
} from "reactstrap";
import axios from "axios";
import { useInput, useSubmit } from "../../../hooks/form";
import { handleValidation, validations } from "../../../utils/validations";
import { backendRoutes, messages } from "../../../utils/constants";

function ForgotPassword(props) {
  const email = useInput("email", "", handleValidation, validations.EMAIL);
  const submit = useSubmit([email], handleSuccess);
  const [toggleAlert, setToggleAlert] = useState({state: false, message: ""});

  function handleSuccess(formData) {
    console.log("Data Length==> ", formData);
    callForgotPassword(formData);
  }

  function callForgotPassword(formData) {
    axios({
      baseURL: backendRoutes.BASE_URL,
      url: backendRoutes.FORGOT_PASSWORD,
      method: "POST",
      data: {
        email: formData.email
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // debugger;
        console.log("api response", response);
        setToggleAlert({state:true, message: messages.EMAIL_SENT})

      })
      .catch(err => {
        console.log("api error", err.response);
        setToggleAlert({state:true, message: err.response.data.message})
      });
  }

  function onAlertDismiss(){
    setToggleAlert({state: false, message: ""})
  }

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="5">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Alert
                    color="danger"
                    isOpen={toggleAlert.state}
                    toggle={onAlertDismiss}
                  >
                    {toggleAlert.message}
                  </Alert>
                  <Form
                    //onSubmit={handleSubmit}
                    noValidate
                    {...submit.props}
                  >
                    <h1>Forgot Password</h1>
                    <p className="text-muted">Please Enter your email id.</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        //name="email"
                        //value={email}
                        //onChange={handleInputChange}
                        {...email.props}
                      />
                      <FormFeedback>{email.helperText}</FormFeedback>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">
                          Submit
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Link to="/login" color="link" className="px-0">
                          Login
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
