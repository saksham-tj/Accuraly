import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Dropdown,
  FormFeedback,
  Alert,
  Spinner
} from "reactstrap";
import { useHistory } from "react-router-dom";
import "./Context.css";
import { useInput } from "../../hooks/form";
import {
  contextQuestionTypes,
  backendRoutes,
  contextStatus,
  userRole,
  userTypes
} from "../../utils/constants";
import MCQ4 from "./QuestionTypes/MCQ4";
import MCQ3 from "./QuestionTypes/MCQ3";
import TRUE_FALSE from "./QuestionTypes/TRUE_FALSE";
import SQ3 from "./QuestionTypes/SQ3";
import SQ4 from "./QuestionTypes/SQ4";
import { selectQuestionType } from "../../actionCreator/contextActions";
import {
  validations,
  handleValidation,
  isObjectEmpty,
  handleCustomValidation
} from "../../utils/validations";
import useAlert from "../../hooks/useAlert";
import axios from "axios";
import CustomSpinner from "../../customComponents/CustomSpinner";

//Form for creating a context.
function CreateContext() {
  const questionReducerData = useSelector(state => state.questionReducer);
  let history = useHistory();
  const contextTitle = useInput("contextTitle", "", null, validations.EMPTY);
  const minWidth = useInput(
    "minWidth",
    "",
    handleValidation,
    validations.NUMBER
  );
  const minHeight = useInput(
    "minHeight",
    "",
    handleValidation,
    validations.NUMBER
  );
  const startsAt = useInput(
    "startsAt",
    0,
    handleValidation,
    validations.NUMBER
  );
  const [canBeSkipped, setCanBeSkipped] = useState(false);
  const [clientLogo, setClientLogo] = useState(null);
  const [defaultLogo, setDefaultLogo] = useState(null);
  const [adClip, setAdClip] = useState(null);

  const [clientLogoId, setClientLogoId] = useState(null);
  const [adClipId, setAdClipId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClipLoading, setIsClipLoading] = useState(false);
  const [isCLogoLoading, setIsCLogoLoading] = useState(false);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const questionType = useSelector(state => state.contextReducer);
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetailsReducer);
  const alertVisibility = useAlert(false);
  let roleId =
    userDetails.user && userDetails.user.RoleId
      ? userDetails.user.RoleId
      : null;

  

  const uploadClientLogo = logo => {
    setIsCLogoLoading(true);
    let logoFormData = new FormData();
    logoFormData.append("logo", logo);
    logoFormData.set("height", "320");
    logoFormData.set("width", "320");
    roleId === userTypes.ADMIN ? logoFormData.set("clientId", 15) : logoFormData.set("clientId", null);


    axios({
      baseURL: backendRoutes.BASE_URL,
      url: backendRoutes.UPLOAD_LOGO,
      method: "POST",
      data: logoFormData,
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        console.log("uploadClientLogo api response: ", response);
        setClientLogoId(response.data.result.id);
        setIsCLogoLoading(false);
      })
      .catch(err => {
        console.log("uploadClientLogo api error:", err);
        setIsCLogoLoading(false);
      });
  };

  const uploadAdClip = clip => {
    setIsClipLoading(true);
    console.log("Role id in upload clip", roleId)
    let clipFormData = new FormData();
    clipFormData.append("clip", clip);
    clipFormData.set("height", "320");
    clipFormData.set("width", "320");
    clipFormData.set("lengthOfPlay", "320");
    userTypes.ADMIN ? clipFormData.set("clientId", 20) : clipFormData.set("clientId", null);


    axios({
      baseURL: backendRoutes.BASE_URL,
      url: backendRoutes.UPLOAD_CLIP,
      method: "POST",
      data: clipFormData,
      headers: {
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        console.log("uploadClientLogo api response: ", response);
        setAdClipId(response.data.result.id);
        setIsClipLoading(false);
      })
      .catch(err => {
        console.log("uploadClientLogo api error:", err);
        setIsClipLoading(false);
      });
  };

  const submitContext = contextData => {
    setIsLoading(true);
    axios({
      baseURL: backendRoutes.BASE_URL,
      url: backendRoutes.CREATE_CONTEXT,
      method: "POST",
      data: contextData,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        console.log("uploadCreatedContext api response: ", response);
        setIsLoading(false);
        history.push("/customer/pending");
      })
      .catch(err => {
        console.log("uploadCreatedContext api error:", err);
        alertVisibility.changeVisibility(true);
        alertVisibility.handleMessage(err.response.data.message);
      });
  };

  const handleContextSubmit = e => {
    e.preventDefault();
    // let contextData = {};
    if (
      clientLogo &&
      //defaultLogo &&
      adClip &&
      !isObjectEmpty(questionReducerData)
    ) {
      let contextSubmitData = {
        clientId: roleId === userTypes.ADMIN ? 15 : null, 
        status: contextStatus.ACTIVE,
        title: contextTitle.props.value,
        startedAt: +startsAt.props.value,
        LogoId: clientLogoId,
        ClipId: adClipId,
        isSkippable: canBeSkipped,
        Question: questionReducerData.questionData
      };
      console.log("contextSubmitData: ", contextSubmitData);
      submitContext(contextSubmitData);
    } else {
      alertVisibility.changeVisibility(true);
      alertVisibility.handleMessage(
        "Please add all these fields: client logo, default logo, title, ad clip and question to continue."
      );
    }

    console.log("min Width: ", minWidth);

    console.log("questionReducerData in create context: ", questionReducerData);
  };

  const handleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleDropdownItem = type => {
    dispatch(selectQuestionType(type));
  };

  function renderQuestionTypes() {
    if (questionType.type === contextQuestionTypes["MCQ4"]) {
      return <MCQ4 />;
    }
    if (questionType.type === contextQuestionTypes["MCQ3"]) {
      return <MCQ3 />;
    }
    if (questionType.type === contextQuestionTypes["TRUEANDFALSE"]) {
      return <TRUE_FALSE />;
    }
    if (questionType.type === contextQuestionTypes["SQ4"]) {
      return <SQ4 />;
    }
    if (questionType.type === contextQuestionTypes["SQ3"]) {
      return <SQ3 />;
    }
  }

  const clientLogoHandler = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(e) {
      setClientLogo(reader.result);
      uploadClientLogo(file);
    };
  };

  const defaultLogoHandler = e => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      setDefaultLogo(reader.result);
    };
  };

  const adClipHandler = e => {
    console.log(" video event target: ", e.target.files[0]);
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    uploadAdClip(file);
    setAdClip(url);

    const videoPlayer = document.getElementById("video-player");
    videoPlayer.load();
    console.log("url: ", url);
  };

  function handleAlertVisibility() {
    alertVisibility.changeVisibility(false);
  }

  return (
    <div className="animated fadeIn">
      <Card>
        {isLoading ? <CustomSpinner /> : null}
        <CardHeader>
          <strong>Context Creation</strong> Form
        </CardHeader>
        <CardBody>
          <div className="video-editor-lab">
            <Form
              action=""
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
            >
              <FormGroup row>
                {roleId === userRole.ADMIN ? (
                  <Col md="12">
                    <div className="form-field">
                      <Label for="exampleSearch">Search Client</Label>
                      <Input
                        type="search"
                        name="search"
                        id="exampleSearch"
                        placeholder="search placeholder"
                      />
                    </div>
                  </Col>
                ) : null}

                <Col md="12">
                  <div className="form-field">
                    <Label htmlFor="text-input">Context title</Label>
                    <Input
                      type="text"
                      //id="text-input"
                      //name="text-input"
                      placeholder="Give a genuine title to your ad."
                      {...contextTitle.props}
                    />
                    <FormFeedback>{contextTitle.helperText}</FormFeedback>
                  </div>
                </Col>
                <Col md="12">
                  <div className="video-main-wrapper">
                    <div className="upload-btn">
                      <Input
                        type="file"
                        className="upload-file-btn"
                        onChange={adClipHandler}
                      />
                      {isClipLoading ? (
                        <Spinner size="sm" color="primary" />
                      ) : null}
                    </div>
                    {/* <Progress animated color="success" value="25" /> */}

                    <div className="video-wrapper">
                      <video id="video-player" width="900" controls>
                        <source
                          id="video-source-id"
                          src={adClip}
                          type="video/mp4"
                        />
                      </video>

                      <div className="base-logo">
                        <img
                          src={
                            defaultLogo
                              ? defaultLogo
                              : require("../../assets/img/brand/EvinceLogo.svg")
                          }
                          className="preview-image"
                          alt=""
                        />
                      </div>
                      <div className="c-base-logo">
                        <img
                          src={
                            clientLogo
                              ? clientLogo
                              : require("../../assets/img/brand/EvinceLogo.svg")
                          }
                          className="preview-image"
                          alt=""
                        />
                      </div>
                      <div className="qa-content">
                        <div className="qa-wrapper">
                          <div className="qa-item-list">
                            <h4 className="title">
                              {questionReducerData &&
                              questionReducerData.questionData
                                ? questionReducerData.questionData.text
                                : "create question below."}
                            </h4>

                            <div className="qa-options">
                              {questionReducerData &&
                              questionReducerData.questionData ? (
                                questionReducerData.questionData.Options.map(
                                  (option, index) => {
                                    return (
                                      <label key={index}>
                                        <input name="video" type="radio" />
                                        <span>{option.answer}</span>
                                      </label>
                                    );
                                  }
                                )
                              ) : (
                                <>
                                  <label>
                                    <input name="video" type="radio" />
                                    <span>Option 1</span>
                                  </label>
                                  <label>
                                    <input name="video" type="radio" />
                                    <span>Option 2</span>
                                  </label>
                                  <label>
                                    <input name="video" type="radio" />
                                    <span>Option 3</span>
                                  </label>
                                  <label>
                                    <input name="video" type="radio" />
                                    <span>Option 4</span>
                                  </label>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="4">
                  <div className="video-logo-upload form-field">
                    <Label>Default Logo</Label>
                    <Input
                      className="custom-file"
                      type="file"
                      id="custom-file-input"
                      name="file-input"
                      onChange={defaultLogoHandler}
                    />
                    <img
                      src={
                        defaultLogo
                          ? defaultLogo
                          : require("../../assets/img/brand/EvinceLogo.svg")
                      }
                      className="preview-image"
                      alt=""
                    />
                  </div>
                </Col>
                <Col md="4">
                  <div className="video-logo-upload form-field">
                    <Label>Select a logo</Label>
                    {isCLogoLoading ? (
                      <Spinner size="sm" color="primary" />
                    ) : null}

                    <Input
                      className="custom-file"
                      type="file"
                      id="custom-file-input"
                      name="file-input"
                      onChange={clientLogoHandler}
                    />
                    <img
                      src={
                        clientLogo
                          ? clientLogo
                          : require("../../assets/img/brand/EvinceLogo.svg")
                      }
                      className="preview-image"
                      alt=""
                    />
                  </div>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <div className="form-field">
                    <Label htmlFor="text-input">Player minimum width</Label>
                    <Input
                      type="text"
                      //id="text-input"
                      //name="text-input"
                      placeholder="in px"
                      {...minWidth.props}
                    />
                    <FormFeedback>{minWidth.helperText}</FormFeedback>
                  </div>
                </Col>
                <Col md="3">
                  <div className="form-field">
                    <Label htmlFor="email-input">Player minimum height</Label>
                    <Input
                      type="text"
                      //id="email-input"
                      //name="email-input"
                      placeholder="in px"
                      {...minHeight.props}
                    />
                    <FormFeedback>{minHeight.helperText}</FormFeedback>
                  </div>
                </Col>
                <Col md="3">
                  <div className="form-field">
                    <form-field>
                      <Label htmlFor="text-input">
                        Question display starts at seconds
                      </Label>
                      <Input
                        type="text"
                        //id="text-input"
                        //name="text-input"
                        placeholder="in sec"
                        {...startsAt.props}
                      />
                      <FormFeedback>{startsAt.helperText}</FormFeedback>
                    </form-field>
                  </div>
                </Col>
                <Col md="3">
                  <div className="form-field">
                    <div className="radio position-relative form-check">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id="is-skipped"
                        name="isSkipped"
                        value={canBeSkipped}
                        checked={canBeSkipped === true ? true : false}
                        onChange={() => {
                          setCanBeSkipped(!canBeSkipped);
                        }}
                      />
                      <Label htmlFor="is-skipped">Can ad be skipped?</Label>
                    </div>
                  </div>
                </Col>
              </FormGroup>
              <Dropdown isOpen={isDropDownOpen} toggle={handleDropDown}>
                <DropdownToggle caret>Question Type</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Select a type</DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      handleDropdownItem(contextQuestionTypes["MCQ4"])
                    }
                  >
                    {contextQuestionTypes["MCQ4"]}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      handleDropdownItem(contextQuestionTypes["MCQ3"])
                    }
                  >
                    {contextQuestionTypes["MCQ3"]}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      handleDropdownItem(contextQuestionTypes.TRUEANDFALSE)
                    }
                  >
                    {contextQuestionTypes.TRUEANDFALSE}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownItem(contextQuestionTypes.SQ4)}
                  >
                    {contextQuestionTypes.SQ4}
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleDropdownItem(contextQuestionTypes.SQ3)}
                  >
                    {contextQuestionTypes.SQ3}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {renderQuestionTypes()}
            </Form>
          </div>
          <Alert
            id="create-context-alert"
            color="danger"
            isOpen={alertVisibility.isVisible}
            toggle={handleAlertVisibility}
          >
            {alertVisibility.message}
          </Alert>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            size="sm"
            color="primary mr-2"
            onClick={handleContextSubmit}
          >
            <i className="fa fa-dot-circle-o"></i> Submit
          </Button>
          <Button type="reset" size="sm" color="danger">
            <i className="fa fa-ban"></i> Reset
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateContext;
