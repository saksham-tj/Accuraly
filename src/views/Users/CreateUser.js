import React from "react";
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
  FormFeedback
} from "reactstrap";
import { useInput, useSubmit } from "../../hooks/form";
import { handleValidation, validations } from "../../utils/validations";
import { backendRoutes } from "../../utils/constants";
import axios from "axios";

// Functional component for creating the user
export default function CreateUser() {
  let firstName, lastName, username, email;

  firstName = useInput("firstName", "", handleValidation, validations.EMPTY);
  lastName = useInput("lastName", "", handleValidation, validations.EMPTY);
  username = useInput("username", "", handleValidation, validations.EMPTY);
  email = useInput("email", "", handleValidation, validations.EMAIL);
  const submit = useSubmit(
    [firstName, lastName, username, email],
    handleSuccess
  );

  function handleSuccess(formData) {
    console.log("Data Length==> ", formData);
    callSignUp(formData);
    firstName.clearInput();
    lastName.clearInput();
    username.clearInput();
    email.clearInput();
  }

  function callSignUp(formData) {
    axios({
      baseURL: backendRoutes.BASE_URL,
      url: backendRoutes.USER_REGISTRATION,
      method: "POST",
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        timezone: "UTC",
        RoleId: 2
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        // debugger;
        console.log("api response", response);
      })
      .catch(err => {
        console.log("api error", err.response.status);
      });
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl="">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Users{" "}
              <small className="text-muted">creation form</small>
            </CardHeader>
            <CardBody>
              <Form noValidate {...submit.props}>
                <h1>Register</h1>
                <p className="text-muted">Create a user account</p>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="First name"
                    autoComplete="on"
                    {...firstName.props}
                  />
                  <FormFeedback>{firstName.helperText}</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Last name"
                    autoComplete="off"
                    {...lastName.props}
                  />
                  <FormFeedback>{lastName.helperText}</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="icon-user"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Username"
                    autoComplete="on"
                    {...username.props}
                  />
                  <FormFeedback>{username.helperText}</FormFeedback>
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>@</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="text"
                    placeholder="Email"
                    autoComplete="on"
                    {...email.props}
                  />
                  <FormFeedback>{email.helperText}</FormFeedback>
                </InputGroup>
                <Button color="success" block>
                  Create Account
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
